(function ($) {
  "use strict";

  /**
   * イベントハンドラの有無を返す
   */

  $.fn.hasEvents = function () {
    var node = $(this).get(0);
    var result = true;

    if (node && $._data(node).events === undefined) {
      result = false;
    }

    return result;
  };

  /**
   * 表示中かどうかを返す
   */

  $.fn.isVisible = function () {
    return $.expr.filters.visible(this[0]);
  };
})(jQuery);
