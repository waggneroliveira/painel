<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends \Spatie\Permission\Models\Permission
{
    use HasFactory;

    public function name()
    {
        return substr($this->name,strpos($this->name,'.')+1);
    }

    public function index()
    {
        $value = explode('.',$this->name);
        return $value[0];
    }
}
