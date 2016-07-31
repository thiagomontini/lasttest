<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

Route::group(['namespace' => 'API'], function() {
    Route::post('/user/login', 'UserController@login');
    Route::post('/user/create', 'UserController@create');
    Route::post('/user/update', 'UserController@update');
    Route::post('/user/scoreboards', 'ScoreboardController@index');
    Route::post('/user/scoreboards/create', 'ScoreboardController@create');
});

Route::auth();
Route::get('/', 'Admin\HomeController@index');    
Route::get('/export/biggest-scorers', ['as' => 'export.biggest.scorers', 'uses'=>'Admin\ExportController@getBiggestScorers']);    
Route::get('admin/user/create', ['as' => 'user.create', 'uses'=>'Admin\UserController@create']);    
Route::post('admin/user/store', ['as' => 'user.store', 'uses'=>'Admin\UserController@store']);    

