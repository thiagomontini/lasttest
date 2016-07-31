<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Excel;
use App\API\Repository\ScoreboardRepository;

class ExportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function getBiggestScorers()
    {
        $scoreboards = ScoreboardRepository::getTheBiggest(10);
        
        Excel::create('theTenBiggestScorersList',function($excel) use ($scoreboards){
          $excel->setTitle('10 Biggest Scorers')->setCreator('Cheapflights')->setCompany('Cheapflights')->setDescription('The 10 biggest scorers in the Spin The Glob Game');
          $excel->sheet('The Ten Biggest Scorers List',function($sheet) use ($scoreboards){
              $sheet->mergeCells('A1:E1');
              $sheet->row(1,[
                  "Spin the Glob Game"
              ]);
              $sheet->mergeCells('A2:E2');
              $sheet->row(2,[
                  "The 10 Biggest Scorers List"
              ]);
               $sheet->row(1, function($row){
                   $row->setFontSize(14)->setAlignment('center');
               });
               $sheet->row(2, function($row){
                   $row->setFontSize(12)->setAlignment('center');
               });
               $sheet->row(3,[
                  'Name','E-mail','City','Country','Score'
              ]);
              foreach ($scoreboards as $scoreboard) {
                  $sheet->appendRow([
                      $scoreboard->username,
                      $scoreboard->useremail,
                      $scoreboard->usercity,
                      $scoreboard->usercountry,
                      $scoreboard->score
                      ]);
              }
              $sheet->setAutoSize(true);
          });
          
        })->export('xlsx');
    }
}
