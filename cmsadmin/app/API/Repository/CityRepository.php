<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\API\Repository;

use App\API\Model\City;
/**
 * Description of CityRepository
 *
 * @author uriel-miranda
 */
class CityRepository
{
    public static function findByAbbreviation($abbr)
    {
        return City::where('abbreviation',  strtolower($abbr))->first();
    }
}
