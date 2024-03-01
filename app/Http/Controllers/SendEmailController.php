<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\SendEmail;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Mail\SendForgotPassword;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Password;

class SendEmailController extends Controller
{
    public function enviarEmail(Request $request) {
        $mail = 'waggner.dev@gmail.com';
        Mail::to($mail)->send(new SendEmail($mail));

        Contact::create([
            'nome' => $request->nome,
            'email' => $request->email,
        ]);
        
        return 'Mensagem enviada com sucesso!';
    }

    public function sendResetLinkEmail(Request $request){
        $request->validate([
            'email' => 'email',
        ]);
        $response = Password::sendResetLink(
            $request->only('email')
        );
        // Verifica se o usuário com o email especificado existe
        $user = User::where('email', '=', $request->email)->first();
        if (!$user) {
            return back()->withErrors(['email' => 'Usuário não encontrado']);
        }        
        
        // Gera o token de redefinição de senha e envia a notificação
        $token = $user->createTokenForPasswordReset();
        $mail = $request->email;
        // Mail::to($mail)->send(new SendForgotPassword($token,$mail));

        Session::flash('success', 'Link de redefinição de senha enviado com sucesso!');
        return $response == Password::RESET_LINK_SENT
            ? redirect()->route('admin.dashboard.painel')
            : 'Não foi possível enviar um link de redefinição de senha.';
    }
}
