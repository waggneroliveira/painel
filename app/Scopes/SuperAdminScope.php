<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class SuperAdminScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('name', '<>', 'Super');
    }
}
