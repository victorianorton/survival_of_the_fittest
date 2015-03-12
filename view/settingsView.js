/*****************
Displays information about settings
*****************/


function settingsView(){
	console.log("creating Organism Stats View");

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	};
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}};
	this.notifyObservers = function(msg){
		console.log(this + " notifying that " + msg);
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	
	/* Setters */
	this.setBirthArrayVal = function(neighbs, bool){
		$("#life-settings #birth  #" + neighbs + " :checkbox").prop("checked", bool);	};
	this.setSustainArrayVal = function(neighbs, bool){
		$("#life-settings #sustain  #" + neighbs + " :checkbox").prop("checked", bool);};


	this.toString = function(){
		return "The Settings View";
	};

	this.prepAfterLoad = function(sv){
		/* Loop through checkboxes to add onclick handlers */
		for (var i = 0; i < 9; i++){
			var cb = $( "#life-settings #birth #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleBirth" + i);
				};
			}(sv,i));

			cb = $( "#life-settings #sustain #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleSustain" + i);
				};
			}(sv,i));
		}
		$(".lifetime").change(function(sv, i){
			return function(){
				sv.notifyObservers("lifetime" + i);
			};
		});
		$("#slow").change(function(){
			sv.notifyObservers("UserSpeed4");
		});
		$("#medium").change(function(){
			sv.notifyObservers("UserSpeed8");
		});
		$("#fast").change(function(){
			sv.notifyObservers("UserSpeed100");
		});
		$( ".spawnWidth" ).change(function(event){
			// console.log("spawn width: " + $('.spawnWidth').val());
			sv.notifyObservers("spawnWidth" + $('.spawnWidth').val());
		});
        $( document ).ready(function() {
        	$(".spawnWidth").slider().slider("pips").slider("float");
       	});
		$( ".spawnHeight" ).change(function(event){
			console.log("spawn height" + $('.spawnHeight').val());
			sv.notifyObservers("spawnHeight" + $('.spawnHeight').val());
		});	
        $( document ).ready(function() {
        	$(".spawnHeight").slider().slider("pips").slider("float");
        });			
		$( ".spawnDensity" ).change(function(event){
			console.log("spawn density: " + $('.spawnDensity').val());
			sv.notifyObservers("spawnDensity" + $('.spawnDensity').val());
		});	
        $( document ).ready(function() {
        	$(".spawnDensity").slider().slider("pips").slider("float");
        });                  
		$( ".spawnCenterX" ).change(function(event){
			console.log("spawn centerX: " + $('.spawnCenterX').val());
			sv.notifyObservers("spawnCenterX" + $('.spawnCenterX').val());
		});	
		$( document ).ready(function() {
			$(".spawnCenterX").slider().slider("pips").slider("float");
		});	
		$( ".spawnCenterY" ).change(function(event){
			console.log("spawn centerY: " + $('.spawnCenterY').val());
			sv.notifyObservers("spawnCenterY" + $('.spawnCenterY').val());
		});
		$( document ).ready(function() {
			$(".spawnCenterY").slider().slider("pips").slider("float");
		});	
		$( ".lifetime" ).change(function(event){
			console.log("lifetime: " + $('.lifetime').val());
			sv.notifyObservers("lifetime" + $('.lifetime').val());
		});
		$( document ).ready(function() {
			$(".lifetime").slider().slider("pips").slider("float");
		});
		$( "#rand" ).click(function(event){
			sv.notifyObservers("UserRand");
		});		
		$( ".mutRate" ).change(function(event){
			// console.log("mutation rate: " + $('#mutRate').val());
			sv.notifyObservers("mutRate" + $('.mutRate').val());
		});
		$( document ).ready(function() {
			$(".mutRate").slider().slider("pips").slider("float");
		});
		$( ".fitnessBirth" ).change(function(event){
			// console.log("fitness births" + $('#fitnessBirth').val());
			sv.notifyObservers("fitnessBirth" + $('.fitnessBirth').val());
		});
		$( document ).ready(function() {
			$(".fitnessBirth").slider().slider("pips").slider("float");
		});		
		$( ".fitnessDeath" ).change(function(event){
			// console.log("fitness deaths: " + $('#fitnessDeath').val());
			sv.notifyObservers("fitnessDeath" + $('.fitnessDeath').val());
		});	
		$( document ).ready(function() {
			$(".fitnessDeath").slider().slider("pips").slider("float");
		});
		$( ".fitnessExplore" ).change(function(event){
			// console.log("fitness explore: " + $('#fitnessExplore').val());
			sv.notifyObservers("fitnessExplore" + $('.fitnessExplore').val());
		});
		$( document ).ready(function() {
			$(".fitnessExplore").slider().slider("pips").slider("float");
		});	
	};

	$(document).ready(this.prepAfterLoad(this));
}