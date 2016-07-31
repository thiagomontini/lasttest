<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScoreboardsTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('scoreboards')) {
            Schema::create('scoreboards', function (Blueprint $table) {
                $table->increments('id');
                $table->string('user_id');
                $table->string('city_id');
                $table->string('score');
                $table->string('coins');
                $table->string('time');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('scoreboards');
    }

}
