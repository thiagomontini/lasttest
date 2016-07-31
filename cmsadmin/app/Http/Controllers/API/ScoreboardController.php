<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\API\Repository\UserRepository;
use App\API\Repository\ScoreboardRepository;


class ScoreboardController extends Controller
{
    public function index(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|email'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => [
                $validator->getMessageBag()
            ]])->setStatusCode(422);
        }
        $user = UserRepository::findByEmail($request->email);
        return ScoreboardRepository::listScoreBoards($user,$request->orderByDesc,  intval($request->limit));
    }
    
    public function create(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|email',
            'city' => 'required',
            'score' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => [
                $validator->getMessageBag()
            ]])->setStatusCode(422);
        }
        $user = UserRepository::findByEmail($request->email);
        $userScoreboards = ScoreboardRepository::create($user,$request);
        
        return response()->json($userScoreboards);
    }
    
    
   
}
