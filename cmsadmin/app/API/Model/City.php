<?php

namespace App\API\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class City extends Eloquent
{
    protected $collection = 'cities';
     
    protected $fillable = ['name','abbreviation'];
    

    public function scoreboards()
    {
        return $this->hasMany('App\API\Model\User');
    }
}
