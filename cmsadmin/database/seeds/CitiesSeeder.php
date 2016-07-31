<?php

use Illuminate\Database\Seeder;
use App\API\Model\City;


class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        City::create([
            "name" => "New York",
            "abbreviation" => "ny",
        ]);
        City::create([
            "name" => "Rio de Janeiro",
            "abbreviation" => "rio",
        ]);
        City::create([
            "name" => "Roma",
            "abbreviation" => "rome",
        ]);
        City::create([
            "name" => "Krabi",
            "abbreviation" => "krabi",
        ]);
        City::create([
            "name" => "Victoria Falls",
            "abbreviation" => "victoria",
        ]);
    }
}
