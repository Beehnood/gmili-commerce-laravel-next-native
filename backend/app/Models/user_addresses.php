<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_addresses extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'first_name',
        'last_name',
        'phone',
        'country',
        'city',
        'postal_code',
        'address_line_1',
        'address_line_2',
        'is_default',
    ];

    // Relation : Une addresse appartient à un user 
    public function user ()
    {
        return $this  -> belongsTo(User::class); 
    }
    
}
