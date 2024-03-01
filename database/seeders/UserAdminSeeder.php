<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Administrador',
            'email' => 'administrador@gmail.com.br',
            'password' => Hash::make('123456789'), // password
            'active' => 1,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'created_at' => now()
        ]);
    }
}
