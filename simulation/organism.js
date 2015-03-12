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

	this.orgID = orgID;
	this.numCols = numCols;
	this.numRows = numRows;

	this.fitness = 0;

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
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	/* Setters */
	this.setBirthCount = function(b){
		//console.log("Org " + orgID + " birth " + this.birthCount + " -> " + b);
		this.birthCount = b;
	};
	this.setSusCount = function(s){
		//console.log("Org " + orgID + " sustain " + this.susCount + " -> " + s);
		this.susCount = s;
	};
	this.setsetDeathCount = function(d){
		//console.log("Org " + orgID + " death " + this.deathCount + " -> " + d);
		this.deathCount = d;
	};
	this.setsetExploredCount = function(e){
		//console.log("Org " + orgID + " explored " + this.exploredCount + " -> " + e);
		this.exploredCount = e;
	};
	this.setSeed = function(seed){
		this.seed = seed;
	};
	this.getSeed = function(){
		return this.seed;
	};
	this.setOrgID = function(ID){
		this.orgID = ID;
	};
	this.setStats = function(stats){
		this.stats = stats;
		this.orgStats = stats.getOrgStats(this.orgID);
	};
	this.setSettings = function(settings){
		this.settings = settings;
	};
	this.setState = function(mat){
		copyMatrix(this.state, mat);
		var activeArray = this.getActiveArea();
	};
	this.setFitness = function(fitness){
		this.fitness = fitness;
	};	

	/* Getters */
	this.getState = function(){
		return this.state;
	};
	this.getCellValue = function(row, col){
		return this.state[row][col];
	};

	this.getMatrix = function(){
		 // console.log("Getting Matrix: " + this.state);
		return this.state;
	};
	this.getPrintableMatrix = function(){
		var printMat = "";
		for (var row = 0; row < this.numRows; row++){
			printMat = this.state[row] + "\n";
		}
	};
	this.getFitness = function(){
		this.updateFitness();
		return this.fitness;
	};		


	/* MODEL STUFF*/
	/* Steps according to the rules in the settings */
	this.step = function(){

		/* Prepare next state's matrix (empty) */
		var nextState = createMatrix(this.numRows, this.numCols, 0);

		/* collect stats counts */
		var birthsCount = 0;
		var deathsCount = 0;
		var sustainsCount = 0;
		var exploredCount = 0;		
		
		/* Shorter names for the settings arrays */
		var birthArray = this.settings.getBirthArray();
		var susArray = this.settings.getSustainArray();

		/* Calculate the next state, collecting stats on the way */
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				neighbours = CalcNeighbours(this.state, row, col);
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

		/* Update the stats for this org */
		this.stats.updateOrgStats(	this.orgID, birthsCount,
									deathsCount, exploredCount );
		/* Save the new state */
		this.state = nextState;
		return;

		/* helper function to get the number of alive neighbors for a cell */
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
	};

	/* Sets each cell to dead */
	this.clearState = function(){
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				this.state[row][col] = 0;
			}
		}
	};

	/* Reset counters, Clear state */
	this.resetOrg = function(){
		this.clearState();
		this.setBirthCount(0);
		this.setDeathCount(0);
		this.setSusCount(0);
		this.setExploredCount(0);
		this.setFitness(0);		
	};

	/* Creates and returns a matrix filled with a passed in value.
		Usually 0 */
	this.initState = function(m, n, initial){
		this.state = [m];
		for (var i = 0; i < m; i += 1) {
			var a = [];
			for (var j = 0; j < n; j += 1) {
				a[j] = initial;
			}
			this.state[i]= a;
		}
	};

	/* Array Changes */
	this.changeBirthArray = function(neighbs, bool){
		this.settings.setBirthArrayVal(neighbs, bool); };
	this.changeSustainArray = function(neighbs, bool){
		this.settings.setSustianArrayVal(neighbs, bool); };

	this.toString = function(){
		return "An Org | orgID: " + this.orgID + ", explored: " + this.stats.getOrgStats(this.orgID).getExplored(); 
	};
	this.updateFitness = function(){
		var fb = this.settings.getFitScalerB();
		var fd = this.settings.getFitScalerD();
		var fe = this.settings.getFitScalerE();
		//var fs = this.settings.getFitScalerS();

		var points = fb*this.orgStats.getBirths()+fd*this.orgStats.getDeaths()+fe*this.orgStats.getExplored();
		this.setFitness(points);
	}

	this.building_toggleCell = function(row, col){
		console.log("Toggling " + row + " " + col + " in " + this);

		var numRows = this.state.length;
		var numCols = this.state[numRows-1].length;
		var numCellsTurnedOn = 0;

		if(row>=0 && row<numRows && col>=0 && col<numCols){
			/* in bounds, toggle */
			if (this.state[row][col] == ALIVE) {
				this.building_setCell(row, col, DEAD);
			} else {
				this.building_setCell(row, col, ALIVE);
			}
		} else {
			/* out of bounds, don't toggle */
		}
	};
	this.building_setCell = function(row, col, newCell){
		console.log("Setting " + row + " " + col + " in " + this);
		// alert(row + " " + col);

		var numRows = this.state.length;
		var numCols = this.state[numRows-1].length;

		if(row>=0 && row<numRows && col>=0 && col<numCols){
			/* in bounds */
			var oldCell = this.state[row][col];
			this.state[row][col] = newCell;

			if (oldCell == ALIVE) {
				if (newCell == DEAD){
					this.orgStats.addToExplored(-1);
				}
			} else if (oldCell == DEAD) {
				if (newCell == ALIVE){
					this.orgStats.addToExplored(1);
				}
			}
		} else {
			/* out of bounds, don't toggle */
		}
	};

	this.getNumAlive = function(){
		var numAlive = 0;
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				if (this.state[row][col] == ALIVE){
					++numAlive;
				}
			}
		}
		return numAlive;
		
	};

	this.getActiveArea = function(){
		var minX = Number.POSITIVE_INFINITY;
		var minY = Number.POSITIVE_INFINITY;
		var maxX = Number.NEGATIVE_INFINITY;
		var maxY = Number.NEGATIVE_INFINITY;
		/* loop through state */
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				if (this.state[row][col] == ALIVE){
					/* SET MIN AND MAXES */
					if (col < minX){
						minX = col;
					}
					if (row < minY){
						minY = row;
					}
					if (col > maxX){
						maxX = col;
					}
					if (row > maxY){
						maxY = row;
					}
				}
			}
		}


		// alert("(" + minX + ", " + minY + ")\n" + "(" + maxX + ", " + maxY + ")");
		
		return [minX, minY, maxX, maxY];
	};

	/* WORK-IN-PROGRESS -- LOW PRIORITY */
	this.patternCtr = function(){
		/*	0: DEAD
			1: ALIVE
			9: WILD (could be either)
		*/
		var glider = [ 
			[9,0,0,0,0], 
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
	};

	/* WORK-IN-PROGRESS -- LOW PRIORITY */
	this.compareBack = function(row, col){
		/* may need better than js arrays for this
			also may need methods to query neighbors
				so we can handle out-of-bounds there, too  */
	};

	this.initState(numRows, numCols, 0);
}

/* GLOBAL FUNCTIONS */

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

/* Copies from newMat to oldMat */
function copyMatrix(oldMat, newMat){
	var rows = oldMat.length;
	var cols = oldMat[0].length;
	for (var i=0; i<rows; i++ ){
		for (var j=0; j<cols; j++){
			oldMat[i][j] = newMat[i][j] ;
		}
	}
}

/* Convert matrix to a string of 0s and 1s with newline endings */
function makeMatrixPrintable(mat){
	var numRows = mat.length;
	// var numCols = mat[0].length;
	var printMat = "";
	for (var row = 0; row < numRows; row++){
		printMat += mat[row] + "\n";
	}
	return printMat;
}