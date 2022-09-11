<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $subscriptionPlans = SubscriptionPlan::all();

        return Inertia::render('User/SubscriptionPlan/Index', [
            'subscriptionPlans' => $subscriptionPlans
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        $data = [
            'user_id' => $request->user()->id,
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            'expire_date' => Carbon::now()->addMonths($subscriptionPlan->active_period_in_month),
            'payment_status' => 'SUCCESS'
        ];

        $userSubscription = UserSubscription::query()->create($data);

        return redirect()->route('user.dashboard.index');
    }
}
