<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\API\Repository;

use App\API\Model\User;
use App\API\Model\Scoreboard;
use App\API\Model\Config;
use App\API\Repository\CityRepository;
use App\API\Repository\UserRepository;

/**
 * Description of ScoreboardRepository
 *
 * @author uriel-miranda
 */
class ScoreboardRepository
{
    private $scoreboard;
    private $user;
    private $config;
    
    public function __construct()
    {
        $this->config = Config::first();
    }
    
    public static function create(User $user,$scoreboard)
    {
        $r = new static ();
        $r->user = $user;
        $r->interactScoreArray($scoreboard);
        $r->saveScoreboard();
        $user = User::find($user->_id);
        return $r->listScoreboards($user, 'score');
    }
    
    public function interactScoreArray($scoreboard)
    {
        $this->scoreboard =  $this->toScoreboardObject($scoreboard);
    }
    
    public function toScoreboardObject($scoreboard)
    {
        $s = new Scoreboard();
        $s->city_id = CityRepository::findByAbbreviation($scoreboard->city)->_id;
        $s->user_id = UserRepository::findByEmail($this->user->email)->_id;
        $s->city = $this->verifyIfIsSet($scoreboard->city);
        $s->score = intval($this->verifyIfIsSet($scoreboard->score));
        $s->coins = intval($this->verifyIfIsSet($scoreboard->coins));
        $s->time = intval($this->verifyIfIsSet($scoreboard->time));
        $s->valid = $this->scoreboardIsValidToPromotion();
        return $s;
    }
    
    public function verifyIfIsSet($property)
    {
        return isset($property)?$property:0;
    }
    
    
    public function saveScoreboard()
    {
        $cloned = clone $this->scoreboard;
        $cloned->save();
        unset($this->scoreboard->user_id);
        $this->user->scoreboards()->save($this->scoreboard);
    }
    
    
    public function scoreboardIsValidToPromotion()
    {
        return count($this->user->scoreboards) < intval($this->config->valid_scoreboards_length);
    }
    
    
    public static function listScoreboards(User $user, $orderByDesc = "created_at", $limit = 5)
    {
        $scoreboards = $user->scoreboards()->get()->sortByDesc($orderByDesc)->take($limit);
        $response = new \App\API\Model\User();
        $response->name = $user->name;
        $response->email = $user->email;
        $response->city = $user->city;
        $response->country = $user->country;
        $response->scoreboards = $scoreboards;
        return $response;
    }
    
    
    public static function getTheBiggest($count)
    {
        $scoreboards = Scoreboard::orderBy('score','desc')->take($count)->get();
        $scorers = [];
        foreach ($scoreboards as $scoreboard) {
            $score = new \stdClass();
            $user = \App\API\Model\User::find($scoreboard->user_id);
            $score->username = $user->name;
            $score->useremail = $user->email;
            $score->usercity = $user->city;
            $score->usercountry = $user->country;
            $score->score = $scoreboard->score;
            $scorers[] = $score;
        }
        
        return $scorers;
    }
    
    public function getJsonResponse()
    {
        $uJson = new App\API\Model\User();
        
    }
}
