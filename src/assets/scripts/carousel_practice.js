(function ($, ns) {
  "use strict";

  console.log('CAROUSEL');

  var btnCnt = 0;
  var sliderNum = $('.js-carousel li').length;　 //liの枚数
  var viewNum = 3; //表示枚数を定義
  var btnCntMax = parseInt(sliderNum) - parseInt(viewNum); //btnCntの最大数を定義
  var slideWidth = $('.js-carousel li').outerWidth(true); //padding込みのスライド一枚分のwidth

  console.log('btnCntMax = ', btnCntMax, 'sliderNum = ', sliderNum, 'viewNum = ', viewNum, 'slideWidth = ', slideWidth);

//初期処理

  //初期値(btnCnt=0)では左ボタンはオフにするので、ここでそうする(画像差し替え)
  if (btnCnt == 0) {
    $('.left img').attr('src', '/assets/images/btn_slider_arrow_prev_nouse.gif')
  };

  //初期値では左ボタンはオフにするので、ここでそうする(背景色)
  if (btnCnt == 0) {
    $('.js-button .left').addClass('unable')
  };

  //スライド

  //右ボタンで、btnCnt < 最大値のとき、ulのmargin-leftを1コマ分減算
  $('.js-button .right').on('click', function () {
    if (btnCnt < btnCntMax) {
      carouselNext();
      btnCnt++;
      console.log(btnCnt);
    };
  });

  //左ボタンで、0 < btnCntのとき、ulのmargin-leftを1コマ分加算
  $('.js-button .left').on('click', function () {
    if (0 < btnCnt) {
      carouselPrev();
      btnCnt--;
      console.log(btnCnt);
    };
  });

  //スライド

  var carouselPrev = function () {
    $('ul.js-carousel').css({
      'margin-left': '+=' + parseInt(slideWidth) + 'px'
    })
  };

  var carouselNext = function () {
    $('ul.js-carousel').css({
      'margin-left': '-=' + parseInt(slideWidth) + 'px'
    })
  };


  //ボタンの画像差し替え

  //右ボタンで,btnCnt == 0のときに左ボタンのarrowをトグル,btnCnt == 最大値-1のときに右ボタンで右ボタンのarrowをトグル
  $('.js-button .right').on('click', function () {
    if (btnCnt == 1) {
      prevActivate();
    } else if (btnCnt == parseInt(btnCntMax)) {
      nextDeactivate();
    };
  });

  //左ボタンで、btnCnt == 1のときに左ボタンのarrowをトグル、btnCnt == 最大値のときに右ボタンのarrowをトグル
  $('.js-button .left').on('click', function () {
    if (btnCnt == 0) {
      prevDeactivate();
    } else if (btnCnt == parseInt(btnCntMax) - 1) {
      nextActivate();
    };
  });

  //ボタンの画像差し替え

  var prevActivate = function () {
    $('.left img').attr('src', '/assets/images/btn_slider_arrow_prev.gif')
  };
  var prevDeactivate = function () {
    $('.left img').attr('src', '/assets/images/btn_slider_arrow_prev_nouse.gif')
  };
  var nextActivate = function () {
    $('.right img').attr('src', '/assets/images/btn_slider_arrow_next.gif')
  };
  var nextDeactivate = function () {
    $('.right img').attr('src', '/assets/images/btn_slider_arrow_next_nouse.gif')
  };

  //背景色の差し替え

   //右ボタンで,btnCnt == 0のときに左ボタンの背景色をトグル,btnCnt == 最大値-1のときに右ボタンで右ボタンの背景色をトグル
   $('.js-button .right').on('click', function () {
    if (btnCnt == 1) {
      prevActivateColor();
    } else if (btnCnt == parseInt(btnCntMax)) {
      nextDeactivateColor();
    };
  });

  //左ボタンで、btnCnt == 1のときに左ボタンの背景色をトグル、btnCnt == 最大値のときに右ボタンの背景色をトグル
  $('.js-button .left').on('click', function () {
    if (btnCnt == 0) {
      prevDeactivateColor();
    } else if (btnCnt == parseInt(btnCntMax) - 1) {
      nextActivateColor();
    };
  });

  //背景色の差し替え

  var prevActivateColor = function () {
    $('.js-button .left').removeClass('unable')
  };
  var prevDeactivateColor = function () {
    $('.js-button .left').addClass('unable')
  };
  var nextActivateColor = function () {
    $('.js-button .right').removeClass('unable')
  };
  var nextDeactivateColor = function () {
    $('.js-button .right').addClass('unable')
  };



  $('.js-button .left').addClass('unable')


})(jQuery, NAME_SPACE);
