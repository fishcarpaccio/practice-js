(function ($, ns) {
  "use strict";
  var target = "";
  var scroll = '';
  $("a[href^='#']").not('[target^=none]').on("click", function(e) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      target = $(this.hash);
      target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

      if (target.length) {
        if (typeof document.body.style.transitionProperty === 'string') {
          e.preventDefault();
          var avail = $(document).height() - $(window).height();
          scroll = target.offset().top;
          if (scroll > avail) {
            scroll = avail;
          }

          $("html").css({
            "margin-top" : ( $(window).scrollTop() - scroll ) + "px",
            "transition" : "0.4s ease-in-out"
          }).data("transitioning", true);
        } else {
          $("html, body").animate({
            scrollTop: scroll
          }, 400);
          return;
        }
      }
    }
  });
  $("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function (e) {
    if (e.target == e.currentTarget && $(this).data("transitioning") === true) {
      $(this).removeAttr("style").data("transitioning", false);
      $("html, body").scrollTop(scroll);
      return;
    }
  });
})(jQuery, NAME_SPACE);
