
var app = (function(){

var randomNumber = function(a,b){
	return Math.floor(Math.random()*(b-a+1) + a);
}

var randomNo = randomNumber(6,12); //lower these numbers for better look
var arrTiles = []; 	//initial array haveing random no of objects, serially
var arrRandom = []; //final array with two entries of each object, random
var prevTile,currentTile;
var clickAllowed = true;
var	deactiveCount = 0;

var randomFill = function(){
	
	while(arrTiles.length > 0){

				n1 = randomNumber(0,2*randomNo-1)
				while(arrRandom[n1]){
					n1 = randomNumber(0,2*randomNo-1)
				}


				n2 = randomNumber(0,2*randomNo-1)
				while(n1==n2 || arrRandom[n2]){
					n2 = randomNumber(0,2*randomNo-1)
				}

				arrRandom[n1] = arrTiles[0];
				arrRandom[n2] = arrTiles[0];
				arrTiles.shift();
		}

}




return {

	
	randomNo: randomNo,
	arrTiles: arrTiles,
	randomFill: randomFill,
	clickAllowed:clickAllowed,
	deactiveCount:deactiveCount,
	randomNo:randomNo,

	getPrevTile: function(){
		return prevTile;

	},
	setPrevTile: function(el){

		prevTile = el;
	},

	getCurrentTile: function(){
		return currentTile;
	},

	setCurrentTile: function(el){
		currentTile = el;
	},

	getRandomArray: function(){

		return arrRandom;
	}

}

}());