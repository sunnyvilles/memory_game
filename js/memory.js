
var getTileElement = function(){

	var el = document.createElement('div');
	el.setAttribute('class','tile')
	return el;
}

var createGame = function(){

$.each(app.getRandomArray(),function(i,obj){

	var el = getTileElement();
	el.setAttribute('name',obj.phrase);
	var image = document.createElement('img');
	image.setAttribute('src',obj.image);
	$(el).append(image);
	$('.Content').append(el);

})
	
}

var showImg = function(){ // shows images of all tiles passed in argument
	$.each(arguments,function(i,el){
		$(el).children().show()

	})
}

var hideImg = function(){ // hides images of all tiles passed in argument
	$.each(arguments,function(i,el){
		$(el).children().hide()

	})
}

var disableClick = function(){ // diables clicks on tiles passed in argument
	$.each(arguments,function(i,el){
		$(el).children().click(false)

	})
}

var addPhrase = function(){  // adds Phrase on tiles passed in argument

	$.each(arguments,function(i,el){
		$(el).html($(el).attr("name").toString())

	})
}

///////////////// call
$.ajax({
dataType: "json",
url: "words.json",
success: function(data){
	var i=0;
		while(i<app.randomNo){
			app.arrTiles.push(data.data[i]);
			i++;
		}
		app.randomFill();
		createGame();
	}
});


var theGame = function(){

		if (!app.getCurrentTile()) { //CurrentTile not present
				
				app.setCurrentTile(this);
				showImg(app.getCurrentTile());
	
			}

			else{ 	//CurrentTile present

				if(!app.getPrevTile()){ // etPrevTile not present, CurrentTile present
					
					app.setPrevTile(app.getCurrentTile()) ;
					app.setCurrentTile(this);
					showImg(app.getCurrentTile());

					if ($(app.getCurrentTile()).attr("name") == $(app.getPrevTile()).attr("name"))
					{
						disableClick(app.getCurrentTile(),app.getPrevTile())
						app.clickAllowed = false;
						window.setTimeout(function(){
							hideImg(app.getCurrentTile(),app.getPrevTile());
							addPhrase(app.getCurrentTile(),app.getPrevTile());
							app.clickAllowed=true;
						},1000);
						
						$('.message').html('<span>matching tiles removed</span>');
						
						$(app.getCurrentTile()).addClass("deactive")
						$(app.getPrevTile()).addClass("deactive")
						app.deactiveCount++;

						if (app.deactiveCount==app.randomNo)
						{	
							$('.message').html('<span>Play Again</span>');
							if (window.confirm('good job ! play again?')) {
        						window.location.reload();
    						}
						}
					}
					else {
						$('.message').html('<span>tiles DO not match</span>')
						
					}
				}
				
				else{  	// both present
					
					hideImg(app.getCurrentTile(),app.getPrevTile())
					app.setCurrentTile(this);
					app.setPrevTile(null) ;
					showImg(app.getCurrentTile());
				}
			}


}


$(document).ready(function(){

	$('.tile').click(function(){

	if (!($(this).attr('class').split(' ')[1] == "deactive") && app.clickAllowed) theGame.apply(this);

	})
})
