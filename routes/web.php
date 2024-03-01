<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SendEmailController;

require __DIR__ . '/panel.php';

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', function () {
    return view('Client.pages.home');
});
Route::get('/contato', function () {
    return view('emails.contato');
});
Route::get('/contact', function () {
    return view('contact');
});
Route::post('/contact/envia', [SendEmailController::class, 'enviarEmail'])->name('send');

// Route::get('/dashboard', function () {
//     return view('Admin.dashboard');
// });
