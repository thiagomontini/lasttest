<?php

namespace App\API\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Scoreboard extends Eloquent
{
    
    protected $collection = 'scoreboards';
    
    public function user()
    {
        return $this->belongsTo('App\API\Model\User');
    }
    
    public function city()
    {
        return $this->belongsTo('App\API\Model\City');
    }
}
