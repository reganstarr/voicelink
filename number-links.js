function numberLinks(){
	var linkNumber = 1;

	$("*").each(function() {
		
		//if you need to re-number, this will hide the original numbering results.
		if(linkNumber == 1){
				$('.link-number').hide();
		}
		
		//handle a tags and buttons
		if( $(this).is( "a" ) || $(this).is( "button" ) ){
			$(this).addClass("voice-link-" + linkNumber);
			$(this).prepend("<span class='link-number'>(#" + linkNumber + ")&nbsp;</span>");
			linkNumber++;
		}
		
		//handle input where type="submit"
		if($(this).is( "input" ) && $(this).is(':submit')){
			$(this).addClass("voice-link-" + linkNumber);
			var currentInputValue = $(this).val();
			$(this).val("(#" + linkNumber + ") "  + currentInputValue);
			linkNumber++;
		}
		
	})
}

Mousetrap.bind('ctrl+n', function(e) {
	numberLinks();
});



$("body").append('<form class="voice-link-form" style="position:fixed; top:0; left:0; z-index: 999; display:none;"><input type="text" name="linkNumber"><button style="display:none;" type="submit">Go</button></form>');



Mousetrap.bind('command+k', function(e) {
	numberLinks();
	
	$('.voice-link-form').show().find('input').val('').focus();
});




$( ".voice-link-form" ).submit(function( event ) {
  event.preventDefault();
 
	var linkNumber = $(this).find( "input[name='linkNumber']" ).val().trim();
	
	$(".voice-link-" + linkNumber)[0].click();

});


