var NAME_SPACE = {};

(function (w, d, ns) {
  "use strict";

  /**
   * html 要素を取得
   */

  ns.root = d.getElementsByTagName("html")[0];

  /**
   * JavaScript 判定用 class を html 要素に反映
   */

  ns.root.classList.remove("-no-js");
  ns.root.classList.add("-js");

  /**
   * ビューポート判定用 class を html 要素に反映
   */

  ns.desktop = w.matchMedia("(min-width:((BREAKPOINT_DESKTOP_MIN_WIDTH)))");
  ns.palmtop = w.matchMedia("(max-width:((BREAKPOINT_PALMTOP_MAX_WIDTH)))");

  var desktopFlag = "-desktop";
  var laptopFlag = "-laptop";
  var palmtopFlag = "-palmtop";

  var setViewFlag = function (flag) {
    ns.root.classList.remove(desktopFlag);
    ns.root.classList.remove(laptopFlag);
    ns.root.classList.remove(palmtopFlag);
    ns.root.classList.add(flag);
  };

  var switchViewFlag = function () {
    if (ns.desktop.matches) {
      setViewFlag(desktopFlag);
    } else if (ns.palmtop.matches) {
      setViewFlag(palmtopFlag);
    } else {
      setViewFlag(laptopFlag);
    }
  };

  switchViewFlag();

  ns.desktop.addListener(switchViewFlag);
  ns.palmtop.addListener(switchViewFlag);
})(window, document, NAME_SPACE);
