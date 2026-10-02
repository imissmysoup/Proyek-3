<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActivityController;

Route::get('/activities/trash', [App\Http\Controllers\ActivityController::class, 'trash'])->name('activities.trash');
Route::post('/activities/{id}/restore', [App\Http\Controllers\ActivityController::class, 'restore'])->name('activities.restore');
Route::resource('activities', ActivityController::class);
Route::get('/', function () {
    return view('welcome');
});
