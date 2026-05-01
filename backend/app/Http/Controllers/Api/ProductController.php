<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json([
            Product::wiyh('category')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:100',
            'price' => 'numeric',
            'compare_at_price' => 'nullable|numeric',
            'stock_quantity' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'in_stock' => 'boolean',
            'has_variants' => 'boolean',
        ]);

        $product = Product::create([
            ...$validated,
            'slug' => Str::slug($validated['name']),
        ]);
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load('category'));

    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'exists:categories,id',
            'name' => 'string|max:100',
            'sku' => 'string|max:50|unique:products,sku,' . $product->id,
            'description' => 'nullable|string|max:100',
            'price' => 'numeric',
            'compare_at_price' => 'nullable|numeric',
            'is_active' => 'boolean',
            'in_stock' => 'boolean',
            'has_variants' => 'boolean',

        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()-> json($product);
       
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
