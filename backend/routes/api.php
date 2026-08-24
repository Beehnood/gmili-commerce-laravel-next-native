<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\UserAddressController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductImageController;
use App\Http\Controllers\Api\ProductVariantController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;


// =====================================================
// TEST
// =====================================================

Route::get('/test', [TestController::class, 'index']);


// =====================================================
// AUTH - PUBLIC
// =====================================================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// =====================================================
// CATALOG - PUBLIC
// =====================================================

// Categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Product Images
Route::get('/product-images', [ProductImageController::class, 'index']);
Route::get('/product-images/{product_image}', [
    ProductImageController::class,
    'show'
]);

// Product Variants
Route::get('/product-variants', [
    ProductVariantController::class,
    'index'
]);

Route::get('/product-variants/{product_variant}', [
    ProductVariantController::class,
    'show'
]);


// =====================================================
// ADMIN
// =====================================================

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Categories
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Products
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Product Images
    Route::post('/product-images', [ProductImageController::class, 'store']);
    Route::put('/product-images/{product_image}', [
        ProductImageController::class,
        'update'
    ]);
    Route::delete('/product-images/{product_image}', [
        ProductImageController::class,
        'destroy'
    ]);

    // Product Variants
    Route::post('/product-variants', [
        ProductVariantController::class,
        'store'
    ]);

    Route::put('/product-variants/{product_variant}', [
        ProductVariantController::class,
        'update'
    ]);

    Route::delete('/product-variants/{product_variant}', [
        ProductVariantController::class,
        'destroy'
    ]);
});


// =====================================================
// AUTHENTICATED USER
// =====================================================

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Addresses
    Route::get('/addresses', [UserAddressController::class, 'index']);
    Route::post('/addresses', [UserAddressController::class, 'store']);
    Route::put('/addresses/{address}', [UserAddressController::class, 'update']);
    Route::delete('/addresses/{address}', [UserAddressController::class, 'destroy']);

    // Cart
    Route::get('/cart', [CartController::class, 'show']);
    Route::post('/cart/items', [CartController::class, 'addItem']);
    Route::put('/cart/items/{cartItem}', [CartController::class, 'updateItem']);
    Route::delete('/cart/items/{cartItem}', [CartController::class, 'removeItem']);
    Route::delete('/cart', [CartController::class, 'clear']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);

    // Checkout
    Route::post('/checkout', [OrderController::class, 'checkout']);
});