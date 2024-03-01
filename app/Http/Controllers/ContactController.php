<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\ContactUpdateRequest;

class ContactController extends Controller
{
    public function index(Request $request)
    {   
        if(!Auth::user()->can('formulario de contato.visualizar')){   
            return view('Admin.error.403');
        }
        $contacts = Contact::query();

        if ($request->filled('search')) {
            $contacts = Contact::where('nome', 'LIKE', '%' . $request->input('search') . '%')->paginate(5);

            return view('Admin.cruds.contact.index', [
                'contacts' => $contacts
            ]);
        }
        if ($request->filled('email')) {
            $contacts = Contact::where('email', 'LIKE', '%' . $request->input('email') . '%')->paginate(5);

            return view('Admin.cruds.contact.index', [
                'contacts' => $contacts
            ]);
        }

        if ($request->date_search) {
            $contacts = Contact::where('data_registro', '=', $request->date_search)->paginate(15);

            return view('Admin.cruds.contact.index', [
                'contacts' => $contacts
            ]);
        }

        if ($request->filled('status')) {
            $contacts->where('status', $request->input('status'));
        }
        $contacts = $contacts->orderBy('created_at', 'desc')->paginate(5);

        return view('Admin.cruds.contact.index', [
            'contacts' => $contacts
        ]);
        
    }

    public function show(Contact $contact)
    {
        //
    }

    public function edit(Contact $contact)
    {   
        if(!Auth::user()->can(['formulario de contato.visualizar','formulario de contato.editar'])){
            return view('Admin.error.403');
        }
        return view('Admin.cruds.contact.edit', [
            'contact' => $contact
        ]);
    }

    public function update(ContactUpdateRequest $request, Contact $contact)
    {
        $data = $request->all();

        $contact->fill($data)->save();
        
        Session::flash('success', 'Atualização realizada com sucesso!');
        return redirect()->route('admin.dashboard.contact.index');
    }

    public function destroy(Contact $contact)
    {
        if(!Auth::user()->can(['formulario de contato.visualizar','formulario de contato.remover'])){
            return view('Admin.error.403');
        }
        $contact->delete();
        
        Session::flash('success', 'Item deletado com sucesso!');
        return redirect()->back();
    }

    public function destroySelected(Request $request)
    {
        if(!Auth::user()->can(['formulario de contato.visualizar','formulario de contato.remover'])){
            return view('Admin.error.403');
        }
        
        if($deleted = Contact::whereIn('id', $request->deleteAll)->delete()){
            
            return Response::json(['status' => 'success', 'message' => $deleted.' itens deletados com sucessso!']);
        }
    }

    public function sorting(Request $request)
    {
        foreach($request->arrId as $sorting => $id){
            Contact::where('id', $id)->update(['sorting' => $sorting]);
        }
        return Response::json(['status' => 'success']);
    }
}
