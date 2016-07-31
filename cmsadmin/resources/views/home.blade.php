@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            @if (session('status'))
                <div class="alert alert-success">
                    {{ session('status') }}
                </div>
            @endif
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    <p>Click to download a sheet with the 10 biggest users scoreboards.</p>
                    <a class="btn btn-block btn-primary" href="{{route('export.biggest.scorers')}}">Get the 10 biggest users scoreboards</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
