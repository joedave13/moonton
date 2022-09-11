<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubscriptionPlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'login');

Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::middleware('checkUserSubscription:true')->group(function () {
        Route::get('movie/{movie:slug}', [MovieController::class, 'show'])->name('movie-show');
    });

    Route::middleware('checkUserSubscription:false')->group(function () {
        Route::get('subscription-plan', [SubscriptionPlanController::class, 'index'])->name('subscription-plan.index');
        Route::post('subscription-plan/{subscriptionPlan}/user-subscribe', [SubscriptionPlanController::class, 'userSubscribe'])->name('subscription-plan.subscribe');
    });
});

Route::prefix('prototype')->name('prototype.')->group(function () {
    Route::get('subscription-plan', function () {
        return Inertia::render('Prototype/SubscriptionPlan');
    })->name('subscription-plan');
});

require __DIR__ . '/auth.php';
