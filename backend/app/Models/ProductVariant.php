<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Prompts\Concerns\HasInfo;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'sku',
        'name',
        'size',
        'color',
        'material',
        'finish',
        'price',
        'is_active',
        'in_stock',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
