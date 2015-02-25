<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Survival</title>
    <meta charset="utf-8">
  <link rel="stylesheet" href="libraries/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="libraries/bootstrap/css/custom.css">
    <script src="libraries/jquery.js"></script>
  <script src="libraries/bootstrap/js/bootstrap.min.js"></script>

    <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
  
  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
  </head>
  <body onload="$( document ).ready(main());">

  <div class="container">
    <div class="jumbotron">
       <h1>Welcome to Conway's Game of life!</h1>    
       <p>A js application for CIS422</p>
    </div>
    
    <div class="row">
    <div class="col-md-6">
      <div id="gens" class="row"></div>
      <div id="age" class="row"></div>
      <canvas id="org-canvas" width="600px" height="600px"></canvas>
    </div>
    <div class="col-md-6">
      <div role="tabpanel">

  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#stats" aria-controls="stats" role="tab" data-toggle="tab">Stats</a></li>
    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
    <li role="presentation"><a href="#saved" aria-controls="saved" role="tab" data-toggle="tab">Saved</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="stats">
      <p>Colony stats go here!</p>
      <p>.......</p>
      <p>.......</p>
    </div>
    <div role="tabpanel" class="tab-pane" id="settings">
      <p>Insert Settings here!</p>
      <p>Births  </p>
      <p>Sustain </p>

      <form action="index.html" method="POST">

      <input type="text" name="birthvals"> 
      <input type="text" name="sustvals"> 
      <br>
      <input type="submit" value="submit">
      <input type="reset" value="erase">
      </form>




    <div role="tabpanel" class="tab-pane" id="saved">
      <p>Saved seeds go here?</p>
    </div>
  </div>

</div>
    </div>
    </div>
  
    <div class="row">    
     <div class="btn-group colony-group">
       <button type="button" id="mo1" class="btn btn-default mini-org">1</button>
       <button type="button" id="mo2" class="btn btn-default mini-org">2</button>
       <button type="button" id="mo3" class="btn btn-default mini-org">33</button>
       <button type="button" id="mo4" class="btn btn-default mini-org">4</button>
       <button type="button" id="mo5" class="btn btn-default mini-org">5</button>
       <button type="button" id="mo6" class="btn btn-default mini-org">6</button>
       <button type="button" id="mo7" class="btn btn-default mini-org">7</button>
       <button type="button" id="mo8" class="btn btn-default mini-org">8</button>
       <button type="button" id="mo9" class="btn btn-default mini-org">9</button>
       <button type="button" id="mo10" class="btn btn-default mini-org">10</button>
     </div>
  </div>
  
    <div class="row"> 
     <div class="btn-group btn-group-lg">
       <button type="button" id="run" class="btn btn-default">Run</button>
       <button type="button" id="step" class="btn btn-default">Step</button>
       <button type="button" id="pause" class="btn btn-default">Pause</button>
       <button type="button" id="run-one-gen" class="btn btn-default">Run 1 Lifetime</button>
       <button type="button" id="reset" class="btn btn-default">Reset Run</button>
       <button type="button" id="save" class="btn btn-default">Save Seed</button>
       <button type="button" id="load" class="btn btn-default">Load Seed</button>
       <button type="button" id="rand" class="btn btn-default">Random Seed </button> 
       
   
    </div>
  </div>  
    
  </div>
    
  
    <script src="simulation/organism.js"></script>
    <script src="simulation/colony.js"></script>
    <script src="view/colonyView.js"></script>
    <script src="view/organismView.js"></script>
    <script src="controllers/organismController.js"></script>
    <script src="controllers/colonyController.js"></script>
    <script src="main.js"></script>
    <script src="view/save.js"></script>
    <script src="view/settings.js"></script>
    <script src="view/stats.js"></script>
  </body>
</html>