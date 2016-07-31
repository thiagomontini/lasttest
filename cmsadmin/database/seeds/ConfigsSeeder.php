<?php

use Illuminate\Database\Seeder;
use App\API\Model\Config;


class ConfigsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Config::create([
            'valid_scoreboards_length' => 5
        ]);
    }
}
