<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bookable;
use Illuminate\Support\Arr;
use Faker\Generator as Faker;

$bookableNames = [
    'Villa',
    'House',
    'Cuttage',
    'Hutt',
    'Mansion',
    'Stadium',
    'Hall'
];

$factory->define(Bookable::class, function (Faker $faker) use ($bookableNames) {
    return [
        'title' => $faker->city . ' ' . Arr::random($bookableNames),
        'description' => $faker->text(),
    ];
});
