 /*
Autor: José Soplin Roncal
*/
 // Counter
      
 $(window).scroll(function(){
   if ($(this).scrollTop() > 100) {
       $('.back-to-top').fadeIn();
   } else {
       $('.back-to-top').fadeOut();
   }
}); 
$('.back-to-top').click(function(){
   $("html, body").animate({ scrollTop: 0 }, 3000);
   return false;
});
