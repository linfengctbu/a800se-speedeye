/**
 * 70mai A800SE-SpeedEye — 交互逻辑
 * G-Sensor / Time-Lapse Tab 切换 + Comprehensive Protection 图片轮播
 */
(function () {
  'use strict';

  // =====================
  // G-Sensor / Time-Lapse Tab 切换
  // =====================
  function initTabSwitch() {
    var tabGensor = document.querySelector('.text_35');
    var tabTimelapse = document.querySelector('.text_36');
    var underlineActive = document.querySelector('.box_5');
    var underlineInactive = document.querySelector('.box_6');

    if (!tabGensor || !tabTimelapse || !underlineActive || !underlineInactive) return;

    var isGensorActive = true;

    function switchToGensor() {
      if (isGensorActive) return;
      isGensorActive = true;

      tabGensor.style.color = 'var(--color-accent, #ff631b)';
      tabTimelapse.style.color = 'var(--color-text-primary, #2c2c31)';
      underlineActive.style.backgroundColor = 'var(--color-accent, #ff631b)';
      underlineInactive.style.backgroundColor = 'var(--color-underline-inactive, rgba(44,44,49,0.3))';
    }

    function switchToTimelapse() {
      if (!isGensorActive) return;
      isGensorActive = false;

      tabGensor.style.color = 'var(--color-text-primary, #2c2c31)';
      tabTimelapse.style.color = 'var(--color-accent, #ff631b)';
      underlineActive.style.backgroundColor = 'var(--color-underline-inactive, rgba(44,44,49,0.3))';
      underlineInactive.style.backgroundColor = 'var(--color-accent, #ff631b)';
    }

    tabGensor.addEventListener('click', switchToGensor);
    tabTimelapse.addEventListener('click', switchToTimelapse);
  }

  // =====================
  // Comprehensive Protection 轮播
  // =====================
  function initCarousel() {
    var track = document.getElementById('carouselTrack');
    var container = document.querySelector('.block_12');
    var dots = document.querySelectorAll('.carousel-dot');
    var btnLeft = document.querySelector('.arrow-left');
    var btnRight = document.querySelector('.arrow-right');

    if (!track || !container || dots.length === 0) return;

    var currentIndex = 0;
    var totalDots = dots.length;

    // 计算每步平移量（一张卡片宽度 + 间距）
    function getStepSize() {
      var items = track.querySelectorAll('.carousel-item');
      if (items.length < 2) return 0;

      var containerWidth = container.offsetWidth;
      var totalItemsWidth = 0;
      for (var i = 0; i < items.length; i++) {
        totalItemsWidth += items[i].offsetWidth;
      }
      // justify-between 的间距 = (容器宽 - 所有卡片总宽) / (卡片数 - 1)
      var gap = (containerWidth - totalItemsWidth) / (items.length - 1);
      return items[0].offsetWidth + gap;
    }

    function updateCarousel() {
      var step = getStepSize();
      if (step <= 0) return;

      var translateX = -currentIndex * step;
      track.style.transform = 'translateX(' + translateX + 'px)';

      // 更新圆点状态
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    // 点击右箭头（下一张/向右切换）
    if (btnRight) {
      btnRight.addEventListener('click', function () {
        if (currentIndex < totalDots - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      });
    }

    // 点击左箭头（上一张/向左切换）
    if (btnLeft) {
      btnLeft.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = totalDots - 1;
        }
        updateCarousel();
      });
    }

    // 点击圆点跳转
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = parseInt(this.getAttribute('data-index'), 10);
        if (!isNaN(index) && index >= 0 && index < totalDots) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });

    // 窗口大小变化时重新计算
    window.addEventListener('resize', updateCarousel);
  }

  // =====================
  // 初始化
  // =====================
  function init() {
    initTabSwitch();
    initCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
