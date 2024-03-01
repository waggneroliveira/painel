<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
        /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
            'active' => 1
        ];
        
        $remember = $request->remember?true:false;

        if (Auth::attempt($credentials, $remember)) {
            return redirect()->intended('painel/dashboard');
        }

        return back()->withErrors([
            'email' => 'As credenciais fornecidas não correspondem aos nossos registros.',
        ]);
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {   
        auth()->logout();

        $request->session()->invalidate();

        return redirect('/painel/login');
    }
}
