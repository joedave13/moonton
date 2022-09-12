<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;
use Illuminate\Support\Str;

class SubscriptionPlanController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        Config::$is3ds = env('MIDTRANS_IS_3DS');
    }

    public function index()
    {
        $subscriptionPlans = SubscriptionPlan::all();

        return Inertia::render('User/SubscriptionPlan/Index', [
            'subscriptionPlans' => $subscriptionPlans,
            'userSubscription' => null
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        $data = [
            'user_id' => $request->user()->id,
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            'payment_status' => 'PENDING'
        ];

        $userSubscription = UserSubscription::query()->create($data);

        $params = [
            'transaction_details' => [
                'order_id' => $userSubscription->id . '-' . Str::random(5),
                'gross_amount' => $userSubscription->price
            ]
        ];

        $snapToken = Snap::getSnapToken($params);

        $userSubscription->snap_token = $snapToken;
        $userSubscription->save();

        return Inertia::render('User/SubscriptionPlan/Index', [
            'userSubscription' => $userSubscription
        ]);
    }

    public function midtransCallback(Request $request)
    {
        $notification = new Notification();

        $transactionStatus = $notification->transaction_status;
        $fraud = $notification->fraud_status;

        $transactionId = explode('-', $notification->order_id)[0];
        $userSubscription = UserSubscription::query()->find($transactionId);

        if ($transactionStatus == 'capture') {
            if ($fraud == 'challenge') {
                $userSubscription->payment_status = 'PENDING';
            } else if ($fraud == 'accept') {
                $userSubscription->payment_status = 'PAID';
                $userSubscription->expire_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_month);
            }
        } else if ($transactionStatus == 'cancel') {
            if ($fraud == 'challenge') {
                $userSubscription->payment_status = 'FAILED';
            } else if ($fraud == 'accept') {
                $userSubscription->payment_status = 'FAILED';
            }
        } else if ($transactionStatus == 'deny') {
            $userSubscription->payment_status = 'FAILED';
        } else if ($transactionStatus == 'settlement') {
            $userSubscription->payment_status = 'PAID';
            $userSubscription->expire_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_month);
        } else if ($transactionStatus == 'pending') {
            $userSubscription->payment_status = 'PENDING';
        } else if ($transactionStatus == 'expire') {
            $userSubscription->payment_status = 'FAILED';
        } else {
            $userSubscription->payment_status = 'FAILED';
        }

        $userSubscription->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Payment success!'
        ]);
    }
}
