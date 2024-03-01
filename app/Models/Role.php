<?php

namespace App\Models;

use App\Scopes\SuperAdminScope;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends \Spatie\Permission\Models\Role
{
    use HasFactory, SoftDeletes;

    protected static function booted(): void
    {
        static::addGlobalScope(new SuperAdminScope);
    }

    public function scopeSorting($query)
    {
        return $query->orderBy('sorting', 'ASC');
    }
}
