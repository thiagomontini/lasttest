<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\API\Repository\UserRepository;
use App\API\RequestHandler\UserRequestHandler;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    
    /**
     * Create a new API user
     * @param Request $request
     * @return type
     */
    public function create(Request $request)
    {
        $repo = new UserRepository();
        $handle = new UserRequestHandler();
        //Handle with the request data
        $handle->setUserRequest($request);
        //If Recived data is missing some request attribute
        if($handle->hasErrors()){return response()->json(['errors' => $handle->getErrors()])->setStatusCode(422);}
        //Catching the object from request
        $requestUser = $handle->getUserRequest();
        //Store the new user
        $user = $repo->create($requestUser);
        //Loggin user and start his session
        \Auth::login($user,true);
        return response()->json($handle->getUserJsonResponse());
    }
    
    /**
     * Update users data and return his new data
     * @param type $id
     * @param Request $request
     * @return type
     */
    public function update($id, Request $request)
    {
        $repo = new UserRepository();
        $handle = new UserRequestHandler();
        $handle->setUserRequest($request);
        $user = $handle->getUserRequest();
        $repo->update($id,$user);
        return response()->json($handle->getUserJsonResponse());
    }
    
    /**
     * Log  user in API
     * @param Request $request
     * @return type
     */
    public function login(Request $request)
    {
        $handle = new UserRequestHandler();
        $handle->setUserLoginRequest($request);
        //If Recived data is missing some request attribute
        if($handle->hasErrors()){return response()->json(['errors' => $handle->getErrors()])->setStatusCode(422);}
        $user = $handle->getUserRequest();
        //Authentification has failed
        if(is_null($user)){
            return response()->json(["errors" => [
                trans('auth.failed')
            ]])->setStatusCode(401);
        }
        //Loggin user and start his session
        \Auth::login($user,true);
        
        return response()->json($handle->getUserJsonResponse());
    }
    
    /**
     * Log user out
     */
    public function logout()
    {
        \Auth::logout();
    }
    
}
