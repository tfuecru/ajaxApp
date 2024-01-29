<?php

use App\Http\Controllers\AjaxController;
use App\Http\Controllers\PaisController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [AjaxController::class, 'main'])->name('ajax.main');

Route::get('ajax/no/funciona', [AjaxController::class, 'main'])->name('ajax.main');

Route::get('pais', [PaisController::class, 'index'])->name('pais.index');

Route::post('pais', [PaisController::class, 'store'])->name('pais.store');

Route::get('logs',[\Rap2hpoutre\LaravelLogViewer\LogViewerController::class,'index']);

Route::put('pais/{code}', [PaisController::class, 'update'])->name('pais.update');

Route::delete('pais/{code}', [PaisController::class, 'destroy'])->name('pais.destroy');

Route::get('pais/{code}', [PaisController::class, 'show'])->name('pais.show');