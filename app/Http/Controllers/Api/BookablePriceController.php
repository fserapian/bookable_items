<?php

namespace App\Http\Controllers\Api;

use App\Bookable;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookablePriceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $id)
    {
        $bookable = Bookable::findOrFail($id);

        $data = $request->validate([
            'from' => 'required|date_format:Y-m-d|after_or_equal:now',
            'to' => 'required|date_format:Y-m-d|after_or_equal:from',
        ]);

        $days = (new Carbon($data['from']))->diffInDays(new Carbon($data['to'])) + 1;
        $totalPrice = $bookable->price * $days;

        return response()->json([
            'data' => [
                'total_price' => $totalPrice,
                'breakdown' => [
                    $bookable->price => $days
                ]
            ]
        ]);
    }
}
