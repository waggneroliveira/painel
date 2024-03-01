<?php

namespace App\Models;

use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'email', 
        'password',
        'active',
        'path_image',
        'remember',
        'sorting',
        'password_reset_token',
        'password_reset_token_created_at',
        'data_registro'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function scopeSorting($query)
    {
        return $query->orderBy('sorting', 'ASC');
    }

    public function createTokenForPasswordReset()
    {
        $token = Str::random(60);
        $this->password_reset_token = $token;
        $this->password_reset_token_created_at = now();
        $this->save();

        return $token;
    }
}
