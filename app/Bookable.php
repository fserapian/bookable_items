<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Bookable extends Model
{
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function availableFor($from, $to): bool
    {
        return $this->bookings()->betweenDates($from, $to)->count() === 0;
    }

    public function priceFor($from, $to): array
    {
        $days = (new Carbon($from))->diffInDays(new Carbon($to)) + 1;

        $totalPrice = $this->price * $days;

        return [
            'total_price' => $totalPrice,
            'breakdown' => [
                $this->price => $days
            ]
        ];
    }
}
