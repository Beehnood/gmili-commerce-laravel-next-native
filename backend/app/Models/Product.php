<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'sku',
        'description',
        'price',
        'compare_at_price',
        'is_active',
        'in_stock',
        'has_variants',
    ];

    // relation : un produit appartient à une catégorie
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // relation : un produit possède plusieurs variantes
    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    // relation : un produit peut être dans plusieurs cart items
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}