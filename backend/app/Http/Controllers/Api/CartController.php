<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show(Request $request)
    {
        $cart = $this->getUserCart($request);

        $cart->load(['items.product', 'items.variant']);

        $total = $cart->items->sum(function ($item) {
            return $item->quantity * $item->unit_price;
        });

        return response()->json([
            'cart' => $cart,
            'total' => $total,
        ]);
    }

    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $this->getUserCart($request);

        $product = Product::findOrFail($validated['product_id']);

        $variant = null;
        $unitPrice = $product->price;

        if (!empty($validated['product_variant_id'])) {
            $variant = ProductVariant::where('product_id', $product->id)
                ->findOrFail($validated['product_variant_id']);

            $unitPrice = $variant->price ?? $product->price;
        }

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->where('product_variant_id', $variant?->id)
            ->first();

        if ($item) {
            $item->update([
                'quantity' => $item->quantity + $validated['quantity'],
            ]);
        } else {
            $item = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'product_variant_id' => $variant?->id,
                'quantity' => $validated['quantity'],
                'unit_price' => $unitPrice,
            ]);
        }

        return response()->json([
            'message' => 'Produit ajouté au panier',
            'item' => $item->load(['product', 'variant']),
        ], 201);
    }

    public function updateItem(Request $request, CartItem $cartItem)
    {
        if ($cartItem->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Accès interdit'], 403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update([
            'quantity' => $validated['quantity'],
        ]);

        return response()->json([
            'message' => 'Quantité mise à jour',
            'item' => $cartItem->load(['product', 'variant']),
        ]);
    }

    public function removeItem(Request $request, CartItem $cartItem)
    {
        if ($cartItem->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Accès interdit'], 403);
        }

        $cartItem->delete();

        return response()->json([
            'message' => 'Article supprimé du panier',
        ]);
    }

    public function clear(Request $request)
    {
        $cart = $this->getUserCart($request);

        $cart->items()->delete();

        return response()->json([
            'message' => 'Panier vidé',
        ]);
    }

    private function getUserCart(Request $request): Cart
    {
        return Cart::firstOrCreate([
            'user_id' => $request->user()->id,
        ]);
    }
}
