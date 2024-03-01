@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# @lang('Whoops!')
@else
# @lang('Olá!')
@endif
@endif

Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha da sua conta.

<?php
    switch ($level) {
        case 'success':
        case 'error':
            $color = $level;
            break;
        default:
            $color = 'primary';
    }
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
 Redefinir Senha
@endcomponent

Este link de redefinição de senha expirará em 60 minutos.

Se você não solicitou uma redefinição de senha, nenhuma ação adicional será necessária.

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('Cumprimentos'),<br>
{{ config('app.name') }}
@endif

{{-- Subcopy --}}
@isset($actionText)
@slot('subcopy')
@lang(
    "Se você estiver com problemas para clicar no botão \"Redefinir Senha\" copie e cole o URL abaixo\n".
    'em seu navegador:',
    [
        'actionText' => $actionText,
    ]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
@endslot
@endisset
@endcomponent
