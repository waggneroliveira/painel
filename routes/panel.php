<?php

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SendEmailController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ForgotPasswordController;


Route::get('painel/', function () {
    return redirect()->route('admin.dashboard.painel');
});
Route::prefix('painel/')->group(function () {
    Route::get('/login', function () {
        return view('Admin.auth.login');
    })->name('admin.dashboard.painel');

    Route::post('login.do', [AuthController::class, 'authenticate'])
    ->name('admin.user.authenticate');

    /*=====================REDEFINICAO DE SENHA=========================*/
    
    // Rota para exibir o formulário "Esqueci a senha"
    Route::get('password/reset', [ForgotPasswordController::class, 'viewForm'])
        ->middleware('guest')->name('password.request');

    // Rota para processar o formulário "Esqueci a senha"
    Route::post('/password/email', function (Request $request) {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(
            $request->only('email')
        );
        
        Session::flash('success', 'Por favor, verifique o seu e-mail para prosseguir com o processo de redefinição de senha.');
        return $status === Password::RESET_LINK_SENT
                    ? back()->with(['status' => __($status)])
                    : back()->withErrors(['email' => __($status)]);
    })->middleware('guest')->name('password.email');

    // Rota para exibir o formulário de redefinição de senha
    Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])
    ->middleware('guest')->name('password.reset');

    // Rota para processar a redefinição de senha
    Route::post('/password/reset', function (Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
     
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordReset($user));
            }
        );
        
        Session::flash('success', 'Senha alterada com sucesso!');
        return $status === Password::PASSWORD_RESET
                    ? redirect()->route('admin.dashboard.painel')->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    })->middleware('guest')->name('password.update');

    /*=====================FINAL REDEFINICAO DE SENHA=========================*/

    Route::middleware('auth')->group(function(){
        
        Route::get('/dashboard', function () {
            return view('Admin.dashboard');
        })->name('admin.dashboard');
        
        //GRUPOS
        Route::resource('grupos', RoleController::class)
        ->names('admin.dashboard.group')
        ->parameters(['grupos' => 'role']);
        Route::post('grupos/delete', [RoleController::class, 'destroySelected'])
            ->name('admin.dashboard.group.destroySelected');
        Route::post('grupos/sorting', [RoleController::class, 'sorting'])
            ->name('admin.dashboard.group.sorting');

        //USUARIOS
        Route::resource('usuario', UserController::class)
            ->names('admin.dashboard.user')
            ->parameters(['usuario'=>'user']);
        //SHOW
        Route::get('usuario/deletados/show', [UserController::class, 'deletedShow'])
            ->name('admin.dashboard.user.show');   
        Route::post('usuario/deletados/show/search', [UserController::class, 'search'])
        ->name('admin.dashboard.user.show.search');
        Route::post('usuario/deletados/show/delete', [UserController::class, 'destroySelectedForced'])
        ->name('admin.dashboard.user.destroySelectedForced');
        //RESTORE
        Route::post('usuario/retoreData/{user}', [UserController::class, 'retoreData'])
            ->name('admin.dashboard.user.retoreData');
        Route::post('usuario/restore', [UserController::class, 'retoreDataAll'])
            ->name('admin.dashboard.user.retoreDataAll');
        //DELETADOS        
        Route::delete('usuario/deleteForced/{user}', [UserController::class, 'deleteForced'])
            ->name('admin.dashboard.user.deleteForced');
        Route::post('usuario/delete', [UserController::class, 'destroySelected'])
            ->name('admin.dashboard.user.destroySelected');
        Route::post('usuario/sorting', [UserController::class, 'sorting'])
            ->name('admin.dashboard.user.sorting');
        
        //CONTATO
        Route::resource('contato', ContactController::class)
            ->names('admin.dashboard.contact')
            ->parameters(['contato'=>'contact']);
        Route::post('contato/delete', [ContactController::class, 'destroySelected'])
            ->name('admin.dashboard.contact.destroySelected');
        Route::post('contato/sorting', [ContactController::class, 'sorting'])
            ->name('admin.dashboard.contact.sorting');
        Route::post('contato/search', [ContactController::class, 'index'])
            ->name('admin.dashboard.contact.search');
        
        // LOGOUT
        Route::get('logout', [AuthController::class, 'logout'])->name('admin.dashboard.user.logout');
    });
});

View::composer('Admin.core.admin', function ($view) {
    $user = User::where('id', Auth::user()->id)->first();
    return $view->with('user', $user);
});