<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

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

// Route::get('/{any?}', function () {
//     return view('welcome');
// })->where('any', '^(?!api\/)[\/\w\.-]*');

class A
{
    public $firstName = 'a';
    public $lastName = 'A';
}
class B
{
    public $firstName = 'b';
    public $lastName = 'B';
}


Route::get('/test', function () {
    $obj1 = new A();
    $obj2 = new B();

    $a = clone $obj1->firstName;

    // var_dump($a);
    // var_dump($obj1);
    dd($a === $obj1);
});
