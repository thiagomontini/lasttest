<?php

namespace App\API\Model;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Config extends Eloquent
{
    /**
     * Mongo collection
     * @var String
     */
    protected $collection = 'configs';
    
    /**
     * Fillable attributes
     */
    protected $fillable = [
            'valid_scoreboards_length'
        ];
    
}
