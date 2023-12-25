/**
 *
 * @param psdWidth 设置设计稿基准宽度
 * @param dividendFontSize 设置开发时的被除数（见HOW TO USE第4步） 在设计稿基准宽度为320时最好设置为16（在在设计稿基准宽度为其他值时等比放大，如640时设置为32等）。因为浏览器默认的值就是16，这样代码失效或尚未起效时，不会有布局问题
 * @param maxRootFontSize 设置最大根元素font-size，请注意这是一个css像素值，而非物理像素值。它的作用是，当用户用非常宽的屏幕（pad、pc）访问页面时，不至于使得根元素的font-size超过这个值，使得布局非常难看。见图“show/wide_max_rem.jpg”
 */
export default function remInit(psdWidth = 1920, dividendFontSize = 16, maxRootFontSize = 32) {
  // 为了代码更短
  const d = document;
  const de = d.documentElement;
  const w = window;
  const on = 'addEventListener';
  const gbcr = 'getBoundingClientRect';

  const head = d.head || d.getElementsByTagName('HEAD')[0];
  const style = d.createElement('STYLE'); // 采用拼css的形式，而不是直接用document.documentElement.style.fontSize的形式的原因是，拼css可以通过加入!important获得最高优先级，http://jsbin.com/dopupudago/2/edit?html,js,output
  let resizeEventThrottleTimer: any;

  // 移除任何text-size-adjust对字体大小的改变效果
  const textSizeAdjustCSS = 'text-size-adjust:100%;';
  const textSizeAdjustCSSAll = `-webkit-${textSizeAdjustCSS}-moz-${textSizeAdjustCSS}-ms-${textSizeAdjustCSS}-o-${textSizeAdjustCSS}${textSizeAdjustCSS}`;

  const hasGbcr = gbcr in de;
  let lastRootFontSize: any = null; // 上一次设置的html的font-size
  function setRem() {
    const rootFontSize = Math.min(
      (hasGbcr
        ? de[gbcr]().width // document.documentElement.getBoundingClientRect() iOS4.0+ 安卓2.0+  https://developer.mozilla.org/zh-CN/docs/Web/API/Element.getBoundingClientRect
        : w.innerWidth) /
        (psdWidth / dividendFontSize),
      maxRootFontSize,
    );
    // alert('2 iW_'+w.innerWidth+'  sw_'+w.screen.width+'  dpr_'+devicePixelRatio+'  or_'+w.orientation+'  gbcrw_'+d.documentElement.getBoundingClientRect().width)
    if (rootFontSize !== lastRootFontSize) {
      // return
      style.innerHTML = `html{font-size:${rootFontSize}px!important;${
        // 20=320/16 // 取16为默认html的font-size是因为浏览器都默认为16，不会导致抖动
        textSizeAdjustCSSAll
      }}`;
      lastRootFontSize = rootFontSize;
    }
  }

  // 在一定延时内稀释setRem的调用
  function trySetRem() {
    clearTimeout(resizeEventThrottleTimer);
    resizeEventThrottleTimer = setTimeout(setRem, 500);
  }

  head.appendChild(style);

  d[on]('DOMContentLoaded', setRem, false);

  w[on]('resize', trySetRem, false);

  setRem();
}
