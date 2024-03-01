<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    public function handle($request, Closure $next) {
        if (auth()->check()) {
            $lastActivity = $request->session()->get('last_activity');
            $sessionTimeout = config('session.lifetime') * 60; // Converte o tempo limite da sessão de minutos para segundos

            // Verifica se a sessão expirou com base no tempo limite e na última atividade registrada
            if (time() - $lastActivity > $sessionTimeout) {
                auth()->logout(); // Fazer logout do usuário
                return redirect()->route('admin.dashboard.painel'); // Redirecionar para a página de login
            }
        }
    
        // Atualiza o registro da última atividade a cada requisição
        $request->session()->put('last_activity', time());
    
        return $next($request);
    }
    

}
