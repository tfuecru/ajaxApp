<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    use HasFactory;
    
    protected $table = 'pais';
    public $timestamps = false;
    protected $primaryKey = 'code';
    protected $keyType = 'string';
    protected $fillable = ['code', 'name']; 
}
