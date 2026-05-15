<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    public function index()
    {
        return response()->json(
            ProductVariant::with('product')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'sku' => 'required|string|unique:product_variants,sku',
            'name' => 'required|string|max:255',

            'size' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:100',
            'material' => 'nullable|string|max:100',
            'finish' => 'nullable|string|max:100',

            'price' => 'nullable|numeric',

            'is_active' => 'boolean',
            'in_stock' => 'boolean',
        ]);


        $variant = ProductVariant::create([
            'product_id' => $validated['product_id'],

            'sku' => $validated['sku'],
            'name' => $validated['name'],

            'size' => $validated['size'] ?? null,
            'color' => $validated['color'] ?? null,
            'material' => $validated['material'] ?? null,
            'finish' => $validated['finish'] ?? null,

            'price' => $validated['price'] ?? null,

            'is_active' => $validated['is_active'] ?? true,
            'in_stock' => $validated['in_stock'] ?? true,
        ]);

        return response()->json($variant, 201);
    }

    public function show(ProductVariant $productVariant)
    {
        return response()->json(
            $productVariant->load('product')
        );
    }

    public function update(Request $request, ProductVariant $productVariant)
    {
        $validated = $request->validate([
            'sku' => 'sometimes|string|unique:product_variants,sku,' . $productVariant->id,
            'name' => 'sometimes|string|max:255',

            'size' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:100',
            'material' => 'nullable|string|max:100',
            'finish' => 'nullable|string|max:100',

            'price' => 'nullable|numeric',

            'is_active' => 'boolean',
            'in_stock' => 'boolean',
        ]);

        $productVariant->update($validated);

        return response()->json($productVariant);
    }


    public function destroy(ProductVariant $productVariant)
    {
        $productVariant->delete();

        return response()->json([
            'message' => 'Variant deleted successfully'
        ]);
    }


}
