<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\UserAddressController;

Route::get('/test', [TestController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/addresses', [UserAddressController::class, 'store']);
    Route::get('/addresses', [UserAddressController::class, 'index']);
    Route::put('/addresses/{address}', [UserAddressController::class, 'update']);
    Route::delete('/addresses/{address}',[UserAddressController::class, 'destroy']);
});
