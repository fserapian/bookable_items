<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Booking extends Model
{
    protected $fillable = ['from', 'to'];

    public function Bookable()
    {
        return $this->belongsTo(Bookable::class);
    }

    // Make sure that date ranges don't overlap
    public function scopeBetweenDates(Builder $query, $from, $to)
    {
        return $query->where('to', '>=', $from)
            ->where('from', '<=', $to);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }
}
