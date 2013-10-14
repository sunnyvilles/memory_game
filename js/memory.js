//random no between a and b
var randomNumber = function(a,b){
return Math.floor(Math.random()*(b-a+1) + a);
}

var randomNo = randomNumber(6,12);
var arrTiles = []; 	 //initial array haveing random no of objects, serially
var arrRandom = []; //final array with two entries of each object, random
var prevTile,currentTile;

////////////globals end //////////////////

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

////DOM//////////////


var getTileElement = function(){

	var el = document.createElement('div');
	el.setAttribute('class','tile')
	return el;
}

var createGame = function(){

$.each(arrRandom,function(i,obj){

	var el = getTileElement();
	el.setAttribute('name',obj.phrase);
	var image = document.createElement('img');
	image.setAttribute('src',obj.image);
	$(el).append(image);
	$('.Content').append(el);

})
	
}



$.ajax({
dataType: "json",
url: "words.json",
success: function(data){
	var i=0;
		while(i<randomNo){
			arrTiles.push(data.data[i]);
			i++;
		}
		randomFill();
		createGame();
	}
});



$(document).ready(function(){


	$('.tile').click(function(){

	
			if (!currentTile) { //currentTile not present
				currentTile = this;
				$(currentTile).children().show()
			}

			else{ 	//currentTile present

				if(!prevTile){ // prevTile not present, currentTile present
					prevTile = currentTile;
					currentTile = this;
					$(currentTile).children().show()
				}
				else{  	// both present
					$(currentTile).children().hide()
					$(prevTile).children().hide()
					currentTile = this;
					prevTile = null;
					$(currentTile).children().show()
				}
			}


	console.log($(prevTile).attr("name"))
	console.log($(currentTile).attr("name"))


	})
})