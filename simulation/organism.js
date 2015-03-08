/*
State: State
File owner:
*/

var DEAD = 0;
var ALIVE = 1;
var EXPLORED = 2;

/* represents the organism "class" */
function organism(orgID, numCols, numRows){
	console.log("creating an Organism");

	this.stats;
	this.settings;
	this.orgID = orgID;
	this.numCols = numCols;
	this.numRows = numRows;

	this.rle = "";

	this.age = 0;

	/*	OBSERVABLE METHODS */
	this.observers = [];

	this.addObserver = function(observer){
		this.observers.push(observer);	}
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}}
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}}

	this.startStep = function(callback){
		// dont remember why this is here
		// I'll leave it to see if I remember
	}

	this.incAge = function(){
		this.setAge(this.age + 1);
	}

	this.setAge = function(a){
		// console.log("Org " + orgID + " age " + this.age + " -> " + a);
		this.age = a;
	}

	this.setBirthCount = function(b){
		//console.log("Org " + orgID + " birth " + this.birthCount + " -> " + b);
		this.birthCount = b;
	}
	this.setSusCount = function(s){
		//console.log("Org " + orgID + " sustain " + this.susCount + " -> " + s);
		this.susCount = s;
	}
	this.setsetDeathCount = function(d){
		//console.log("Org " + orgID + " death " + this.deathCount + " -> " + d);
		this.deathCount = d;
	}	
	this.setsetExploredCount = function(e){
		//console.log("Org " + orgID + " explored " + this.exploredCount + " -> " + e);
		this.exploredCount = e;
	}
	this.setSeed = function(seed){
		this.seed = seed;
	}
	this.getSeed = function(){
		return this.seed;
	}

	this.setOrgID = function(ID){
		this.orgID = ID;
	}

	this.setStats = function(stats){
		this.stats = stats;
	}
	this.setSettings = function(settings){
		this.settings = settings;
	}

	/* function for when the simulation should step the simulation */
	this.step = function(){

		this.incAge();
		var nextState = createMatrix(this.numRows, this.numCols, 0);
		// console.log("	stepping org " + this.orgID);
		var birthsCount = 0;
		var deathsCount = 0;
		var sustainsCount = 0;
		var exploredCount = 0;		
		
		var birthArray = this.settings.getBirthArray();
		var susArray = this.settings.getSustainArray();

		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				neighbours = CalcNeighbours(this.state, row, col);
				// console.log("neighbours " + row + ", " + col + ": " + neighbours);
				if(this.state[row][col] == ALIVE){
					if(susArray[neighbours] == 1){
						sustainsCount++;
						nextState[row][col] = ALIVE;
					} else {
						deathsCount++;
						nextState[row][col] = EXPLORED;
					}
				} else if (birthArray[neighbours] == 1) {
					if(this.state[row][col] != EXPLORED){
						exploredCount++;
					}
					birthsCount++;
					nextState[row][col] = ALIVE;
				} else if (this.state[row][col] == EXPLORED){
					nextState[row][col] = EXPLORED;
				} else{
					nextState[row][col] = DEAD;
				}	
			}
		}
		this.stats.updateOrgStats(	this.orgID, birthsCount,
									deathsCount, exploredCount );
		// console.log("next: " + nextState);
		this.state = nextState;
		// this.notifyObservers("StateChanged");
		return;

		function CalcNeighbours(s, r, c){

			var total = 0;
			if(s[r][c] == 1){
				total--;
			}
			for (var h = -1; h <= 1; h++) {
    		    for (var w = -1; w <= 1; w++) {
				  if((r+h >= ROWS) || (c+w >= COLUMNS) || (r+h < 0) || (c+w < 0)){
				  }	else{
					  if (s[r+h][c+w] == ALIVE) {
						total++;
					  }
				  } 
    		    }
			}
			return total;
		}
	}



	this.toggleCell = function(row, col){
		// alert(row + " " + col);

		/* if out of bounds, return early and don't toggle */
		if(!(row>=0 && row<this.numRows && col>=0 && col<this.numCols  )){
			return;
		}

		console.log("Org " + this.orgID + " toggling cell: " + row + ", " + col);
		console.log("    currently: " + this.state[row][col]);
		if (this.state[row][col] == ALIVE) {
			this.state[row][col] = DEAD;
			this.stats.getOrgStats(this.orgID).addToExplored(-1);			
		} else {
			this.state[row][col] = ALIVE;
			this.stats.getOrgStats(this.orgID).addToExplored(1);
		}
		console.log("    after: " + this.state[row][col]);
		// alert(this.state);
		// this.state[row][col] = (this.state[row][col] == ALIVE) ? 0:1;
		this.notifyObservers("StateChanged");
	}
	this.getCellValue = function(row, col){
		return this.state[row][col];
	}

	this.clearState = function(){
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				this.state[row][col] = 0;
			}
		}
		// this.notifyObservers("StateChanged");
	}

	this.getMatrix = function(){
		 // console.log("Getting Matrix: " + this.state);
		return this.state;
	}
	this.getPrintableMatrix = function(){
		var printMat = "";
		for (var row = 0; row < this.numRows; row++){
			printMat = this.state[row] + "\n";
		}
	}

	/* function to clear the organism */
	this.resetOrg = function(){
		this.clearState();
		this.setAge(0);
		this.setBirthCount(0);
		this.setDeathCount(0);
		this.setSusCount(0);
		this.setExploredCount(0);
	}

	/* Creates and returns a matrix filled with a passed in value. Usually 0 */
	this.initState = function(m, n, initial){
		this.state = [m];
		for (var i = 0; i < m; i += 1) {
			var a = [];
			for (var j = 0; j < n; j += 1) {
				a[j] = initial;
			}
			this.state[i]= a;
		}
	}

	this.setState = function(mat){
		copyMatrix(this.state, mat);
	}
	this.getState = function(){
		return this.state;
	}
	this.changeBirthArray = function(neighbs, bool){
		this.settings.setBirthArrayVal(neighbs, bool);
	}
	this.changeSustainArray = function(neighbs, bool){
		this.settings.setSustianArrayVal(neighbs, bool);
	}

	this.toString = function(){
		return "An Org | orgID: " + this.orgID + ", explored: " + this.stats.getOrgStats(this.orgID).getExplored(); 
	}

	/* WORK-IN-PROGRESS -- LOW PRIORITY */
	this.patternCtr = function(){
		var glider = [ 
			[9,0,0,0,0], //Why is there a "9" in row 0, col 0? Typo?
			[0,0,1,0,0],
			[0,1,1,0,0],
			[0,1,0,1,0],
			[0,0,0,0,0]
		];
		var square = [
			[0,0,0,0],
			[0,1,1,0],
			[0,1,1,0],
			[0,0,0,0]
		];
		var cross = [
			[0,0,0,0,0],
			[0,1,1,1,0],
			[0,0,0,0,0],
		];
	}

	/* WORK-IN-PROGRESS -- LOW PRIORITY */
	this.compareBack = function(row, col){
		/* may need better than js arrays for this
			also may need methods to query neighbors
				so we can handle out-of-bounds there, too  */
	}

	this.initState(numRows, numCols, 0);
}

/* Creates and returns a matrix filled with a passed in value. Usually 0 */
function createMatrix(m, n, initial){
	var mat = new Array(m);
	for (var i = 0; i < m; i += 1) {
		var a =   new Array(n);
		for (var j = 0; j < n; j += 1) {
			a[j] = initial;
		}
		mat[i]= a;
	}
	return mat;
}


function copyMatrix(oldMat, newMat){
	var rows = oldMat.length;
	var cols = oldMat[0].length;
	for (var i=0; i<rows; i++ ){
		for (var j=0; j<cols; j++){
			oldMat[i][j] = newMat[i][j] ;
		}
	}
}

function makeMatrixPrintable(mat){
	var numRows = mat.length;
	// var numCols = mat[0].length;
	var printMat = "";
	for (var row = 0; row < numRows; row++){
		printMat += mat[row] + "\n";
		
		// for (var col = 0; col < numCols; col++){
		// 	printMat = mat[row] + "\n";
		// }
	}
	return printMat;
}

/* returns number of cells added */
function toggleCell(state, row, col){
	// alert(row + " " + col);

	var numRows = state.length;
	var numCols = state[numRows-1].length;
	var numCellsTurnedOn = 0;

	/* in bounds, toggle */
	if(row>=0 && row<numRows && col>=0 && col<numCols){
		if (state[row][col] == ALIVE) {
			state[row][col] = DEAD;
			// this.stats.getOrgStats(this.orgID).addToExplored(-1);			
			console.log("Turning cell ON:  " + row + ", " + col);
			numCellsTurnedOn = -1;
		} else {
			state[row][col] = ALIVE;
			// this.stats.getOrgStats(this.orgID).addToExplored(1);
			console.log("Turning cell OFF: " + row + ", " + col);
			numCellsTurnedOn = 1;
		}
		// console.log("    after: " + state[row][col]);
	} else { // out of bounds, don't toggle
		numCellsTurnedOn = 0;
	}

	return numCellsTurnedOn;
}