<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Review;
use Faker\Generator as Faker;

$factory->define(Review::class, function (Faker $faker) {
    return [
        'id' => $faker->uuid(),
        'content' => $faker->sentences(5, true),
        'rating' => $faker->numberBetween(1, 5),
    ];
});
