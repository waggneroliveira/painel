<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Requests\RecoverPasswordRequest;

class ResetPasswordController extends Controller
{
    public function showResetForm($token){
        return view('Admin.auth.reset-password', [
            'token'=>$token
        ]);
    }
}
