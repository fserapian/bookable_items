<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Booking;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Booking::class, function (Faker $faker) {
    $from =  Carbon::instance($faker->dateTimeBetween('-30 days', '+30 days'));
    $to = (clone $from)->addDays(random_int(0, 14));
    return [
        'from' => $from,
        'to' => $to,
    ];
});