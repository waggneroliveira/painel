<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Role;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Helpers\HelperArchive;
// use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    protected $pathUpload = 'admin/uploads/images/user/';

    public function index()
    {   
        if(!Auth::user()->can('usuario.visualizar')){     
            return view('Admin.error.403');
        }

        $users = User::where('id', '<>', 1)->sorting()->paginate(15);
        $currentRole = Role::join('model_has_roles', 'roles.id', 'model_has_roles.role_id')->get();
        $otherRoles = Role::whereNotIn('id', $currentRole->pluck('id'))->get(); 
        $permissions = Permission::join('role_has_permissions', 'permissions.id', 'role_has_permissions.permission_id')
        ->groupBy('permissions.name')
        ->select('permissions.name')
        ->get();
        $userDeleteds_at = User::onlyTrashed()->count();
        
        return view('Admin.cruds.user.index', [
            'users'=>$users,
            'otherRoles'=>$otherRoles,
            'permissions'=>$permissions,
            'currentRole'=>$currentRole,
            'userDeleteds_at'=>$userDeleteds_at
            
        ]);
    }

    public function create()
    {  
        if(!Auth::user()->can(['usuario.visualizar','usuario.criar'])){ 
            return view('Admin.error.403');
        }       
        $roles = Role::all();
        $currentRole = '';
        $otherRoles = '';

        return view('Admin.cruds.user.create', [
            'roles'=>$roles,
            'currentRole'=>$currentRole,
            'otherRoles'=>$otherRoles,
            'roles'=>$roles
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $data = $request->all();
        $helper = new HelperArchive();
        $roles = $request->validated()['roles']??[];

        try {
            DB::beginTransaction();

            $path_image = $helper->renameArchiveUpload($request, 'path_image');
            if ($path_image) {$data['path_image'] = $this->pathUpload . $path_image;}
            $data['password'] = Hash::make($request->password);
            $data['active'] = $request->active ? 1 : 0;

            $userExist = User::where('email', $data['email'])->first();

            if ($userExist) {
                Storage::delete($this->pathUpload . $path_image);

                return redirect()->back()->with('error', 'Erro ao cadastrar usuário! Este e-mail já existe em nossos registros.');
            } else {
                $user = User::create($data);
                $user->syncRoles($roles);
    
                if ($path_image) {$request->file('path_image')->storeAs($this->pathUpload, $path_image);}
                Session::flash('success', 'Usuário cadastrado com sucesso!');
            }

            DB::commit();
            return redirect()->route('admin.dashboard.user.index');
        }catch(\Exception $exception){
            dd($exception);
            DB::rollBack();
            Session::flash('error', 'Erro ao cadastrar o Usuário!');
            return redirect()->back();
        }
    }

    public function edit(User $user)
    {  
        if(!Auth::user()->can(['usuario.visualizar','usuario.editar'])){ 
            return view('Admin.error.403');
        }      
        
        $currentRole = Role::join('model_has_roles', 'roles.id', 'model_has_roles.role_id')
        ->where('model_has_roles.model_id', $user->id)->get();
        $otherRoles = Role::whereNotIn('id', $currentRole->pluck('id'))->get(); 

        return view('Admin.cruds.user.edit', [
            'user' => $user,
            'otherRoles' => $otherRoles,
            'currentRole' => $currentRole,
        ]);
    }
    public function show(User $user){
        
    }
    public function deletedShow(User $user){
        if(!Auth::user()->can(['usuario.restaurar dados','usuario.visualizar'])){ 
            return view('Admin.error.403');
        }
        $userDeleteds_at = User::onlyTrashed()->paginate(5);        
        return view('Admin.cruds.user.show', [
            'userDeleteds_at' => $userDeleteds_at,
            'user' => $user
        ]);
    }

    public function search(Request $request){
        if(!Auth::user()->can('usuario.visualizar')){ 
            return view('Admin.error.403');
        }
        
        if ($request->filled('email')) {
            $userDeleteds_at = User::onlyTrashed()->where('email', 'LIKE', '%' . $request->input('email') . '%')->paginate(5);

            return view('Admin.cruds.user.show', [
                'userDeleteds_at' => $userDeleteds_at
            ]);
        }
        if ($request->filled('name')) {
            $userDeleteds_at = User::onlyTrashed()->where('name', 'LIKE', '%' . $request->input('name') . '%')->paginate(5);

            return view('Admin.cruds.user.show', [
                'userDeleteds_at' => $userDeleteds_at
            ]);
        }
        if ($request->date_search) {
            // dd($request->date_search);
            $userDeleteds_at = User::onlyTrashed()->where('data_registro', '=', $request->date_search)->paginate(15);
        
            return view('Admin.cruds.user.show', [
                'userDeleteds_at' => $userDeleteds_at
            ]);
        }
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $data = $request->all();
        $helper = new HelperArchive();
        $roles = $request->validated()['roles']??[];
        
        if (Auth::user()->hasRole('Super') && $user->id == 1) {
            $roles[] = 'Super';
        }

        try {
            DB::beginTransaction();
            $path_image = $helper->renameArchiveUpload($request, 'path_image');
            if ($path_image) $data['path_image'] = $this->pathUpload . $path_image;
            if ($path_image) {
                Storage::delete($user->path_image);
                $request->file('path_image')->storeAs($this->pathUpload, $path_image);
            }
            if(isset($request->delete_path_image) && !$path_image){
                $inputFile = $request->delete_path_image;
                Storage::delete($user->$inputFile);
                $data['path_image'] = null;
            }

            $data['password'] = Hash::make($request->password);
            $data['active'] = $request->active ? 1 : 0;
            if($request->password == '') unset($data['password']);

            $user->fill($data)->save();
            $user->syncRoles($roles);

            if ($path_image) {Storage::delete($this->pathUpload.$path_image);}
            if ($path_image) {$request->file('path_image')->storeAs($this->pathUpload, $path_image);}
            DB::commit();
            Session::flash('success', 'Usuário atualizado com sucesso!');
            return redirect()->route('admin.dashboard.user.index');
        }catch(\Exception $exception){
            dd($exception);
            DB::rollBack();
            Session::flash('error', 'Erro ao atualizar o Usuário!');
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['message-error'=>$exception->getMessage()]);
        }
    }

    public function destroy(User $user)
    { 
        if(!Auth::user()->can(['usuario.visualizar','usuario.remover'])){
            return view('Admin.error.403');
        }
        Storage::delete($user->path_image);
        $user->delete();
        
        Session::flash('success','Usuário deletado com sucesso!');
        return redirect()->back();
    }
    public function deleteForced($id)
    { 
        if (!Auth::user()->can(['usuario.visualizar','usuario.remover'])) {
            return view('Admin.error.403');
        }
    
        $user = user::withTrashed()->find($id);
        if ($user) {
            // Verifique se o usuário autenticado tem permissão para excluir permanentemente o user (opcional)
            // ...
            
            try {
                $user->forceDelete();
                Session::flash('success', 'Usuário excluído com sucesso!');
                Session::flash('reopenModal','modal-user');
            } catch (\Exception $e) {
                Session::flash('error', 'Erro ao excluir o usuário.');
            }
        }

        return redirect()->route('admin.dashboard.user.index');
    }

    public function destroySelectedForced(Request $request)
    {
        if (!Auth::user()->can(['usuario.visualizar','usuario.remover'])) {
            return view('Admin.error.403');
        }

        if($deletedForever = User::whereIn('id', $request->deleteAllForever)->forceDelete()){            
            return Response::json(['status' => 'success', 'message' => $deletedForever.' itens deletados com sucessso!']);
        }
    }
    
    public function destroySelected(Request $request)
    {
        if (!Auth::user()->can(['usuario.visualizar','usuario.remover'])) {
            return view('Admin.error.403');
        }

        if($deleted = User::whereIn('id', $request->deleteAll)->delete()){            
            return Response::json(['status' => 'success', 'message' => $deleted.' itens deletados com sucessso!']);
        }
    }

    public function sorting(Request $request)
    {
        foreach($request->arrId as $sorting => $id){
            User::where('id', $id)->update(['sorting' => $sorting]);
        }
        return Response::json(['status' => 'success']);
    }

    public function retoreData($id){
        if (!Auth::user()->can(['usuario.visualizar','usuario.restaurar dados'])) {
            return view('Admin.error.403');
        }
        $user = User::onlyTrashed()->where('id', $id);
        $user->restore();

        Session::flash('success','Registro restaurado com sucesso!');
        Session::flash('reopenModal','modal-user');
        return redirect()->route('admin.dashboard.user.index');
    }

    public function retoreDataAll(Request $request)
    {
        if (!Auth::user()->can(['usuario.visualizar','restaurar dados'])) {
            return view('Admin.error.403');
        }

        if($restored = User::whereIn('id', $request->restoreAll)->restore()){            
            return Response::json(['status' => 'success', 'message' => $restored.' itens restaurados com sucessso!']);
        }
    }
}
