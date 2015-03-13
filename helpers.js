/*****************
Global utility functions
*****************/
STATE_WIDTH = 50;
STATE_HEIGHT = 50;

function getRandInt(min, max) {
	/* inclusive -> exclusive */
	return Math.floor(Math.random() * (max - min)) + min;
}
function boolFromPercent(rate){
	return Math.floor(Math.random() * (100/rate)) === 0;
}
function inRange(val, min, max){
	return (min <= val && val < max);
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

function createArrayCopy(arr){
	var newArr = [];
	for(var i = 0; i<arr.length; ++i){
		newArr.push(arr[i]);
	}
	return newArr;
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

function fillToSize(oldMatrix){
	var newMatrix = createMatrix(STATE_WIDTH, STATE_HEIGHT, 0);
	oldW = oldMatrix.length;
	oldH = oldMatrix[0].length;

	for(var i=0; i<oldW; i++){
		for(var j=0; j<oldH; j++){
			newMatrix[STATE_WIDTH/2-Math.floor(oldW/2)+i][STATE_HEIGHT/2-Math.floor(oldH/2)+j] = oldMatrix[i][j];
		}
	}

	return newMatrix;
}