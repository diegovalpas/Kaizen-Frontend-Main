/* 
   Autor : José Soplin Roncal
   Version: 2.0
*/


(function ($) {

    'use strict';

    //owlCarousel
    $("#owl-testi").owlCarousel({
        autoPlay: 3000, //Autoplay de 3 segundos
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2]
    });
    $('.email-select').selectize({
        valueField: 'name',
        labelField: 'name',
        placeholder: 'Selecciona algo'
    });
})(jQuery)