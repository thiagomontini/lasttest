<?php


namespace App\API\RequestHandler;

use Illuminate\Http\Request;
use App\API\Model\User;
use App\API\Model\Config;
/**
 * Description of UserRequestHandler
 *
 * @author uriel-miranda
 */
class UserRequestHandler
{
    private $user;
    private $hasErrors = false;
    private $errors = [];

    /**
     * Verify user request and set the make an object with the atttibutes
     * @param Request $request
     */
    public function setUserRequest(Request $request)
    {
        $validator = $this->validator($request->all());
        if($validator->fails()){
            $this->setErrors($validator->getMessageBag());
        }
        $this->user = new User();
        $this->user->name = $request->name;
        $this->user->email = $request->email;
        $this->user->city = $request->city;
        $this->user->scoreboards = [];
        $this->user->country = $request->country;
    }
    
    public function getUserRequest()
    {
        return $this->user;
    }
    
    public function setUserLoginRequest(Request $request)
    {
        $validator = $this->loginValidator($request->all());
        if($validator->fails()){
            $this->setErrors($validator->getMessageBag());
        }
        $this->user = User::where('email',$request->email)->first();

    }
    

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return \Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'city' => 'required|max:255',
            'country' => 'required|max:255',
            'password' => 'required|min:6',
        ]);
    }
    
    
    /**
     * Get a validator for an incoming login request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function loginValidator(array $data)
    {
        return \Validator::make($data, [
            'email' => 'required|email|max:255',
            'password' => 'required|min:6',
        ]);
    }


    public function hasErrors()
    {
        return $this->hasErrors;
    }
    
    public function setErrors($messages)
    {
        $this->hasErrors = true;
        $this->errors[] = $messages;
    }
    
    
    public function getErrors()
    {
        return $this->errors;
    }
    
    public function getUserJsonResponse()
    {
        $_token = csrf_token();
        return [
            'name' => $this->getUserRequest()->name,
            'email' => $this->getUserRequest()->email,
            'city' => $this->getUserRequest()->city,
            'country' => $this->getUserRequest()->country,
            'scoreboards' => $this->user->scoreboards()->orderBy('score','desc')->all(),
            'valid_tries_left' => (Config::first()->valid_scoreboards_length - $this->user->scoreboards()->count()),
            '_token' => $_token
        ];
    }
}
