/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
*/ 

(function ($) {

  $(document).ready(function(){
  
   $('.tpt-content-zone').isotope(
   { 
       layoutMode : 'masonry' ,
       itemSelector : '.node-article',
       masonry : {columnWidth: 50}
       
   }
   );

 
  });
})(jQuery);
