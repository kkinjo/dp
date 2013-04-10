/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
*/ 



//==============================================================
// jQuery isotope
// ==============================================================

  jQuery.Isotope.prototype._masonryResizeChanged = function() {
    return true;
  };

  jQuery.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    this._getSegments();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  
    if ( this.options.masonry.cornerStampSelector ) {
      var $cornerStamp = this.element.find( this.options.masonry.cornerStampSelector ),
          stampWidth = $cornerStamp.outerWidth(true) - ( this.element.width() % this.masonry.columnWidth ),
          cornerCols = Math.ceil( stampWidth / this.masonry.columnWidth ),
          cornerStampHeight = $cornerStamp.outerHeight(true);
    //  for ( i = Math.max( this.masonry.cols - cornerCols, cornerCols ); i < this.masonry.cols; i++ ) {
		for ( i = ( this.masonry.cols - cornerCols ); i < this.masonry.cols; i++ ) {
        this.masonry.colYs[i] = cornerStampHeight;
      }
    }
  };

jQuery(function(){
var $container = jQuery('#zone-content');
$container.isotope({
	 itemSelector: '.node-article',
	// resizable: false,
	 masonry : {
        cornerStampSelector: '.corner-stamp',
		//columnWidth: 240
		columnWidth: $container.width() / 4
		
      }
});

var selector = '';
jQuery('.nav-listing li a').click(function(){

  selector = jQuery(this).attr('data-filter');  
	$all = jQuery('.nav-listing li a[data-filter="*"]');
	
	var num_selected = jQuery('.nav-listing li a.selected').length;  //get total count of selected options before clicking
	
	/* if show all option clicked */
  if( selector == "*" ){
		jQuery('.nav-listing li a').removeClass('selected');		
		jQuery(this).addClass('selected');						
	/* - if any category option clicked and its already selected, it should unfiltered 
		- show all option is not selected
		- num of other options selected is more than 1 */	
	}else if( jQuery(this).hasClass('selected') && !$all.hasClass('selected')){
		jQuery(this).removeClass('selected');				
	/* - if any category option clicked, it should added
		 - show all option is not selected
		 - num of other options selected is more than 1 */	
	}else if( !jQuery(this).hasClass('selected') && !$all.hasClass('selected') ){		
		jQuery(this).addClass('selected');
	}else{
		jQuery('.nav-listing li a').removeClass('selected');
		jQuery(this).addClass('selected');	
	}
	
	
  num_selected = jQuery('.nav-listing li a.selected').length;  //get total count of selected options after clicking
	
	/*If non of the option selected then show all*/
	if( num_selected == 0 ){		
		$all.addClass('selected');
		selector = $all.attr('data-filter');  
	}
	
	var isoFilters = [];
	if( num_selected>0 && !$all.hasClass('selected') ){
		optionsList = jQuery('.nav-listing li a.selected');		
		
		for( i=0; i<num_selected; i++){			
			isoFilters.push( optionsList.eq(i).attr('data-filter') );
		}		
		selector = isoFilters.join();
	}
	//alert(selector);
	
	$container.isotope({ filter: selector });
	
	//calling append function
	//alert(this.id);
	appenditem(this.id);
	jQuery('#primary-nav .sixteen').animate({ 'height' : 28 },function(){
		jQuery('#btn-nav-opt').removeClass('up');
		pageScroll('#primary-nav-scroll',700); //scrolling page to the top when user clicks  on categories
		setTimeout(function(){jQuery(window).resize()},20); 
	});
	
  return false;
});


jQuery('#get-cats').change(function(){

  var selector = jQuery(this).val();
  $container.isotope({ filter: selector });
  selector = selector.replace(".","");
	appenditem(selector);
	pageScroll('#primary-nav-scroll',700); //scrolling page to the top when user clicks  on categories
  return false;
}); 
 
});

// update columnWidth on window resize
    jQuery(window).smartresize(function(){
	//$('.corner-stamp .post .columns .four').css('float','none');
		var $container = jQuery('#post-listing');
      $container.isotope({
        // set columnWidth to a percentage of container width
        masonry: {
          columnWidth: $container.width() / 4
        }
      });
	  
    });


//==============================================================
// Get Total Height
// ==============================================================

function getTotalHt(obj, addPadding, addMargin, addBorder){
	if(jQuery(obj).is(':hidden')) return false;
	
    addPadding = typeof addPadding == 'undefined' ? 1 : addPadding;
    addMargin = typeof addMargin == 'undefined' ? 1 : addMargin;
    addBorder = typeof addBorder == 'undefined' ? 1 : addBorder;
    
    var totalHt = jQuery(obj).height();
    if( addPadding == 1){
    totalHt += parseInt(jQuery(obj).css('padding-top'));
    totalHt += parseInt(jQuery(obj).css('padding-bottom'));
    }
    if( addMargin == 1){
    totalHt += parseInt(jQuery(obj).css('margin-top'));
    totalHt += parseInt(jQuery(obj).css('margin-bottom'));
    }
    if( addBorder == 1){
    totalHt += parseInt(jQuery(obj).css('borderTopWidth'));
    totalHt += parseInt(jQuery(obj).css('borderBottomWidth'));
    }
    
    return totalHt;
}

//==============================================================
// iPhone Safari viewport scaling bug fixing
// =============================================================
(function(doc) {

	var addEvent = 'addEventListener',
	    type = 'gesturestart',
	    qsa = 'querySelectorAll',
	    scales = [1, 1],
	    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));