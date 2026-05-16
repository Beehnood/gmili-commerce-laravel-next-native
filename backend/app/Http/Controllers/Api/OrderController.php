<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($orders);

    }

    public function show(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        return response()->json(
            $order->load('items')
        );
    }

    public function checkout(Request $request)
    {
        $user = $request->user();

        $cart = Cart::with([
            'items.product',
            'items.variant'
        ])->where('user_id', $user->id)->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json([
                'message' => 'Panier Vide'
            ], 400);
        }

        $suntotal = 0;

        foreach ($cart->items as $item) {
            $suntotal += $item->quantity * $item->unit_price;
        }

        $suntotal = 0;

        foreach ($cart->items as $item) {
            $suntotal += $item->quantity * $item->unit_price;
        }

        $discountTotal = 0;
        $taxTotal = 0;
        $shippingTotal = 0;

        $grandTotal =
            $suntotal
            - $discountTotal
            + $taxTotal
            + $shippingTotal;

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),

            'status' => 'pending',
            'payment_status' => 'pending',

            'subtotal' => $suntotal,
            'discount_total' => $discountTotal,
            'tax_total' => $taxTotal,
            'shipper_total' => $grandTotal,
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([

                'order_id' => $order->id,

                'product_id' => $item->product_id,
                'product_variant_id' => $item->product_variant_id,

                'product_name' => $item->product->name,

                'sku' => $item->variant?->sku
                    ?? $item->product->sku,

                'quantity' => $item->quantity,

                'unit_price' => $item->unit_price,

                'total_price' =>
                    $item->quantity * $item->unit_price,

            ]);
        }

        $cart->items()->delete();

        return response()->json([
            'message' => 'Commande créée avec succès',
            'order' => $order->load('items'),
        ], 201);

    }


}
