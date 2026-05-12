<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    public function index()
    {
        return response()->json(
            ProductImage::with('product')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'image_url' => 'required|string',
            'is_primary' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $image = ProductImage::create([
            'product_id' => $validated['product_id'],
            'image_url' => $validated['image_url'],
            'is_primary' => $validated['is_primary'] ?? false,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return response()->json($image, 201);
    }

    public function show(ProductImage $productImage)
    {
        return response()->json(
            $productImage->load('product')
        );
    }

    public function update(Request $request, ProductImage $productImage)
    {
        $validated = $request->validate([
            'image_url' => 'sometimes|string',
            'is_primary' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $productImage->update($validated);

        return response()->json($productImage);
    }

    public function destroy(ProductImage $productImage)
    {
        $productImage->delete();

        return response()->json([
            'message' => 'Image deleted successfully'
        ]);
    }
    
}