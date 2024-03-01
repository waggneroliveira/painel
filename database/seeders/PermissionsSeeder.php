<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $permissions = [
            'banners'=>[
                'Criar',
                'Editar',
                'Visualizar',
                'Remover',
                ],
            'formulario de contato'=>[
                'Editar',
                'Visualizar',
                'Remover'
            ],
            'grupo'=>[
                'Criar',
                'Editar',
                'Visualizar',
                'Remover'
            ],
            'usuario'=>[
                'Criar',
                'Editar',
                'Visualizar',
                'Remover',
                'Restaurar dados',
                'Atribuir grupos']
            ];

        foreach($permissions as $key => $permission){
            foreach($permission as $value){
                Permission::create([
                    'name'=>strtolower("{$key}.{$value}")
                ]);
            }
        }   
    }
    
}
