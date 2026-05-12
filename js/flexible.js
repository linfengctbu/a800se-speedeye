(function flexible(window, document) {
  function resetFontSize() {
    var clientWidth = document.documentElement.clientWidth;
    var docEl = document.documentElement;

    if (clientWidth <= 768) {
      // 移动端：锁定根字体大小，使用 responsive.css 的 vw 布局
      docEl.style.fontSize = '37.5px';
      docEl.classList.add('is-mobile');
    } else {
      // PC 端：原有缩放逻辑
      var size = (clientWidth / 2880) * 37.5;
      docEl.style.fontSize = size + 'px';
      docEl.classList.remove('is-mobile');
    }
  }

  // reset root font size on page show or resize
  window.addEventListener('pageshow', resetFontSize);
  window.addEventListener('resize', resetFontSize);
})(window, document);
