<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\ResetPasswordController;

class ForgotPasswordController extends Controller
{
    public function viewForm(){
        return view('Admin.auth.recover-password');
    }
}
