var	isTouching = false; //Flag for whether or not the user is currently touching the screen

function linkMod() {	

	$('.nav_link').on('morph', function() {
		$(this).data("link", $(this).attr("href"));
		$(this).attr("href", "javascript:preventDefault()");
	});
	
	$('.nav_link').trigger("morph");


	$('.vis-mere').on('morph', function() {
		$(this).attr("href", "javascript:preventDefault()");
		$(this).data("number", this.id.slice(-2));
	});
	
	$('.vis-mere').trigger("morph");

	/**
	 * Fired when an item is being touched.
	 */
	$('.vis-mere').on("touchstart MSPointerDown", function(){
	  if(isTouching) return false;
	  $(this).data("moved", false);
	
	  isTouching = true;
	  
	  return false;
	});


	/**
	 * Fired when the user moves his/her finger.
	 * If we detect a move, we're not interested in the "tap" anymore
	 */
	$('.vis-mere').on("touchmove MSPointerMove", function(){
	  	$(this).data("moved", true);
	  	return false;
	});
	
	
	/**
	 * Fired when the touch has ended.
	 * If e.currentTarget.moved is true, then the user moved his/her finger while
	 * touching this item so we "cancel" the tap.
	 */
	$('.vis-mere').on("touchend MSPointerUp", function(){
	  	isTouching = false;
	  	
	  	if(!$(this).data("moved")) {
	  		var no = $(this).data("number");
			if($("#beskrivelse"+no).css("display") == "none"){
				$("#beskrivelse"+no).css("display", "block");
				$('html,body').animate({scrollTop: $("#overskrift"+no).offset().top}, 'slow');
				$(this).html("Luk");
			} else {
				$("#beskrivelse"+no).css("display", "none");
				$(this).html("Vis mere...");
			}
		
		}
	  	
	  	delete $(this).data("moved"); //Don't need our flag anymore
	  	
	  	return false;
	});
	
	$('.ext_link').click(function(e) {
		e.preventDefault();
		var url = $(this).attr("href");
		$(this).attr("href","");
		window.open(url, "_system");
		return false;
	});
	
	/**
	 * Fired when an item is being touched.
	 */
	$('.nav_link').on("touchstart MSPointerDown", function(){
	  if(isTouching) return false;
	  $(this).data("moved", false);

	  isTouching = true;
  
	  return false;
	});


	/**
	 * Fired when the user moves his/her finger.
	 * If we detect a move, we're not interested in the "tap" anymore
	 */
	$('.nav_link').on("touchmove MSPointerMove", function(){
	  	$(this).data("moved", true);
	  	return false;
	});


	/**
	 * Fired when the touch has ended.
	 * If e.currentTarget.moved is true, then the user moved his/her finger while
	 * touching this item so we "cancel" the tap.
	 */
	$('.nav_link').on("touchend MSPointerUp", function(){
	  	isTouching = false;
  	
	  	if(!$(this).data("moved")) {
			window.open($(this).data("link"), "_self");
		}
  	
	  	delete $(this).data("moved"); //Don't need our flag anymore
  	
	  	return false;
	});
	

}

