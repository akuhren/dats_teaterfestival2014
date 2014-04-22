var	isTouching = false; //Flag for whether or not the user is currently touching the screen

function link_mod() {	

	$('a').on('morph', function() {
		$(this).data("link", $(this).attr("href"));
		$(this).attr("href", "javascript:preventDefault()");
	});
	

	$('.vis-mere').on('morph', function() {
		$(this).data("number", this.id.slice(-2));
		$(this).data("old_text", "Luk");
	});
	
	$('a').trigger("morph");
	
	$('.beskrivelse').css("display", "none");

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
	$('a').on("touchstart MSPointerDown", function(){
	  if(isTouching) return false;
	  $(this).data("moved", false);

	  isTouching = true;
  
	  return false;
	});


	/**
	 * Fired when the user moves his/her finger.
	 * If we detect a move, we're not interested in the "tap" anymore
	 */
	$('a').on("touchmove MSPointerMove", function(){
	  	$(this).data("moved", true);
	  	return false;
	});


	/**
	 * Fired when the touch has ended.
	 * If e.currentTarget.moved is true, then the user moved his/her finger while
	 * touching this item so we "cancel" the tap.
	 */
	$('a').on("touchend MSPointerUp", function(){
	  	isTouching = false;
  	
	  	if(!$(this).data("moved")) {
			if($(this).hasClass("vis-mere")){
				info_expand($(this).data("number"));
			} else {
				var target = ($(this).hasClass("ext_link")) ? "_system" : "_self";
				window.open($(this).data("link"), target);
			}
		}
  	
	  	delete $(this).data("moved"); //Don't need our flag anymore
  	
	  	return false;
	});
	

}

function info_expand(no) {
	vis_knap = $("#mere"+no);
	beskrivelse = $("#beskrivelse"+no);

	var new_text = vis_knap.data("old_text");
	vis_knap.data("old_text", vis_knap.html());

	if(beskrivelse.css("display") == "none"){
		beskrivelse.css("display", "block");
		$('html,body').animate({scrollTop: $("#overskrift"+no).offset().top}, 'slow');
	} else {
		beskrivelse.css("display", "none");
	}

	vis_knap.html(new_text);
	
}