<?php


namespace App\API\Repository;

use App\API\Model\User;
use App\API\Model\Config;

/**
 * This class 
 *  
 */
class UserRepository
{
    
    private $config;


    public function __construct()
    {
        $this->config = Config::first();
    }
    
    /**
     * Create an user
     */
    public function create(User $user)
    {
        return User::create(
            [
                'name' => $user->name,
                'email' => $user->email,
                'city' => $user->city,
                'country' => $user->country,
                'scoreboards' => [],
                'password' => bcrypt($user->password),
                'valid_scoreboards_length' => $this->config->valid_scoreboards_length
            ]);
    }
    
    
    /**
     * Update an user
     * @param User $u
     */
    public function update(User $u)
    {
        $user = User::where('email',$u->email)->first();
        $user->email = trim($u->email);
        $user->name = trim($u->name);
        $user->country = trim($u->country);
        $user->city = trim($u->city);
        $user->password = bcrypt($u->password);
        $user->save();
    }
    
    /**
     * Find a user with his e-mail
     * @param String e-mail
     */
    public static function findByEmail($email)
    {
        return User::where('email',$email)->first();
    }
    

}
