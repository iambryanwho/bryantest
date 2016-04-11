/**
 * Prints out the inline javascript needed for the colorpicker and choosing
 * the tabs in the panel.
 */

jQuery(document).ready(function($) {
  $('input').iCheck({
    radioClass: 'iradio_square-grey',
    increaseArea: '20%' // optional
  });
  $('input').on('ifClicked', function (event) {
        var value = $(this).val();
        if (value == "text_logo") {
		jQuery('#section-logo_typography').slideDown();
			jQuery('#section-logo_url').slideUp();
		}
        else if (value == "image_logo") {
            jQuery('#section-logo_typography').slideUp();
			jQuery('#section-logo_url').slideDown();
        }
    });
	// Fade out the save message
	$('.fade').delay(2000).fadeOut(1000);
	
	// Color Picker
	$('.colorSelector').each(function(){
		var Othis = this; //cache a copy of the this variable for use inside nested function
		var initialColor = $(Othis).next('input').attr('value');
		$(this).ColorPicker({
		color: initialColor,
		onShow: function (colpkr) {
		$(colpkr).fadeIn(500);
		return false;
		},
		onHide: function (colpkr) {
		$(colpkr).fadeOut(500);
		return false;
		},
		onChange: function (hsb, hex, rgb) {
		$(Othis).children('div').css('backgroundColor', '#' + hex);
		$(Othis).next('input').attr('value','#' + hex);
	}
	});
	}); //end color picker
	
	// Switches option sections
	$('.group').hide();
	var activetab = '';
	if (typeof(localStorage) != 'undefined' ) {
		activetab = localStorage.getItem("activetab");
	}
	if (activetab != '' && $(activetab).length ) {
		$(activetab).fadeIn();
	} else {
		$('.group:first').fadeIn();
	}
	$('.group .collapsed').each(function(){
		$(this).find('input:checked').parent().parent().parent().nextAll().each( 
			function(){
				if ($(this).hasClass('last')) {
					$(this).removeClass('hidden');
						return false;
					}
				$(this).filter('.hidden').removeClass('hidden');
			});
	});
	
	if (activetab != '' && $(activetab + '-tab').length ) {
		$(activetab + '-tab').addClass('nav-tab-active');
	}
	else {
		$('.nav-tab-wrapper a:first').addClass('nav-tab-active');
	}
	$('.nav-tab-wrapper a').click(function(evt) {
		$('.nav-tab-wrapper a').removeClass('nav-tab-active');
		$(this).addClass('nav-tab-active').blur();
		var clicked_group = $(this).attr('href');
		if (typeof(localStorage) != 'undefined' ) {
			localStorage.setItem("activetab", $(this).attr('href'));
		}
		$('.group').hide();
		$(clicked_group).fadeIn();
		evt.preventDefault();
		
		// Editor Height (needs improvement)
		$('.wp-editor-wrap').each(function() {
			var editor_iframe = $(this).find('iframe');
			if ( editor_iframe.height() < 30 ) {
				editor_iframe.css({'height':'auto'});
			}
		});
	
	});
           					
	$('.group .collapsed input:checkbox').click(unhideHidden);
				
	function unhideHidden(){
		if ($(this).attr('checked')) {
			$(this).parent().parent().parent().nextAll().removeClass('hidden');
		}
		else {
			$(this).parent().parent().parent().nextAll().each( 
			function(){
				if ($(this).filter('.last').length) {
					$(this).addClass('hidden');
					return false;		
					}
				$(this).addClass('hidden');
			});
           					
		}
	}
	
	// Image Options
	$('.of-radio-img-img').click(function(){
		$(this).parent().parent().find('.of-radio-img-img').removeClass('of-radio-img-selected');
		$(this).addClass('of-radio-img-selected');		
	});
		
	$('.of-radio-img-label').hide();
	$('.of-radio-img-img').show();
	$('.of-radio-img-radio').hide();


	// Show/Hide Logo Typography
	//$('#section-logo_type input[type="radio"]').click(function() {
		//if ($(this).filter(":checked").val() == 'text_logo'){
	  		//$('#section-logo_typography').slideDown();
	  		//$('#section-logo_url').slideUp();
		//} else {
			//$('#section-logo_typography').slideUp();
			//$('#section-logo_url').slideDown();
		//};		
	//});	

	//if ($('#section-logo_type input[type="radio"]:checked').val() == 'image_logo') {
		//$('#section-logo_typography').slideUp();
		//$('#section-logo_url').slideDown();
	//}
	

    //jQuery('#section-logo_type input[type="radio"]').change(function () {
       // if(jQuery('#section-logo_type input[type="radio"]:checked').val()=="text_logo") {
           //jQuery('#section-logo_typography').slideDown();
			//jQuery('#section-logo_url').slideUp();
        //} else {
           // jQuery('#section-logo_typography').slideUp();
			//jQuery('#section-logo_url').slideDown();
        //}
   // });
	
	
	if(jQuery('#section-logo_type').find('input[type="radio"]:checked').val()=="text_logo") {
            jQuery('#section-logo_typography').slideDown();
			jQuery('#section-logo_url').slideUp();
        } else {
            jQuery('#section-logo_typography').slideUp();
			jQuery('#section-logo_url').slideDown();
        }

	// Show/Hide Footer Menu Typography
	$('#section-footer_menu input[type="radio"]').click(function() {
		if ($(this).filter(":checked").val() == 'true'){
	  		$('#section-footer_menu_typography').fadeIn(400);
		} else {
			$('#section-footer_menu_typography').fadeOut(400);
		};		
	});	

	if ($('#section-footer_menu input[type="radio"]:checked').val() == 'false') {
		$('#section-footer_menu_typography').hide();
	}
});


