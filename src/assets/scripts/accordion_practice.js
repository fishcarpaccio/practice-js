(function ($, ns) {
  "use strict";

console.log('AEIOU');

$('.toggleTarget').addClass('js-invisible');

    $('.toggleButton').on('click', function(){
        $(this).next('.toggleTarget').slideToggle(200);
    });

    $('.js-open-all').on('click', function(){
  console.log('open');
  $('.toggleTarget').slideDown(500);
});

$('.js-close-all').on('click', function(){
  console.log('close');
  $('.toggleTarget').slideUp(500);
});



})(jQuery, NAME_SPACE);
