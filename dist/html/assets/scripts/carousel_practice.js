!function(t,n){"use strict";console.log("CAROUSEL");var s=0,e=t(".js-carousel li").length,o=parseInt(e)-parseInt(3),i=t(".js-carousel li").outerWidth(!0);console.log("btnCntMax = ",o,"sliderNum = ",e,"viewNum = ",3,"slideWidth = ",i),0==s&&t(".left img").attr("src","/assets/images/btn_slider_arrow_prev_nouse.gif"),0==s&&t(".js-button .left").addClass("unable"),t(".js-button .right").on("click",function(){s<o&&(a(),s++,console.log(s))}),t(".js-button .left").on("click",function(){0<s&&(r(),s--,console.log(s))});var r=function(){t("ul.js-carousel").css({"margin-left":"+="+parseInt(i)+"px"})},a=function(){t("ul.js-carousel").css({"margin-left":"-="+parseInt(i)+"px"})};t(".js-button .right").on("click",function(){1==s?l():s==parseInt(o)&&f()}),t(".js-button .left").on("click",function(){0==s?u():s==parseInt(o)-1&&c()});var l=function(){t(".left img").attr("src","/assets/images/btn_slider_arrow_prev.gif")},u=function(){t(".left img").attr("src","/assets/images/btn_slider_arrow_prev_nouse.gif")},c=function(){t(".right img").attr("src","/assets/images/btn_slider_arrow_next.gif")},f=function(){t(".right img").attr("src","/assets/images/btn_slider_arrow_next_nouse.gif")};t(".js-button .right").on("click",function(){1==s?g():s==parseInt(o)&&d()}),t(".js-button .left").on("click",function(){0==s?b():s==parseInt(o)-1&&_()});var g=function(){t(".js-button .left").removeClass("unable")},b=function(){t(".js-button .left").addClass("unable")},_=function(){t(".js-button .right").removeClass("unable")},d=function(){t(".js-button .right").addClass("unable")};t(".js-button .left").addClass("unable")}(jQuery,NAME_SPACE);