/**
 * 70mai A800SE-SpeedEye — 交互逻辑
 * G-Sensor / Time-Lapse Tab 切换 + Comprehensive Protection 图片轮播 + 汉堡菜单
 */
(function () {
  'use strict';

  // =====================
  // 汉堡菜单切换
  // =====================
  function initHamburgerMenu() {
    var hamburgerBtn = document.querySelector('.hamburger-btn');
    var mobileNav = document.querySelector('.mobile-nav');
    var mobileOverlay = document.querySelector('.mobile-nav-overlay');
    var closeBtn = document.querySelector('.mobile-nav-close');

    if (!hamburgerBtn || !mobileNav || !mobileOverlay) return;

    function toggleMobileNav() {
      mobileNav.classList.toggle('open');
      mobileOverlay.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    }

    hamburgerBtn.addEventListener('click', toggleMobileNav);
    mobileOverlay.addEventListener('click', toggleMobileNav);
    if (closeBtn) {
      closeBtn.addEventListener('click', toggleMobileNav);
    }
  }

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
    var btnLeft = document.querySelector('.arrow-left');
    var btnRight = document.querySelector('.arrow-right');

    if (!track || !container) return;

    var currentIndex = 0;

    // 获取当前激活的圆点集合（PC 或移动端）
    function getActiveDots() {
      return document.querySelectorAll(
        window.innerWidth <= 768 ? '#carouselDotsMobile .carousel-dot' : '#carouselDots .carousel-dot'
      );
    }

    var dots = getActiveDots();
    var totalDots = dots.length;

    // 计算每步平移量
    function getStepSize() {
      var items = track.querySelectorAll('.carousel-item');
      if (items.length < 2) return 0;

      var containerWidth = container.offsetWidth;
      var isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // 移动端：每次滑动一张卡片宽度
        return items[0].offsetWidth;
      } else {
        // PC 端：justify-between 间距计算
        var totalItemsWidth = 0;
        for (var i = 0; i < items.length; i++) {
          totalItemsWidth += items[i].offsetWidth;
        }
        var gap = (containerWidth - totalItemsWidth) / (items.length - 1);
        return items[0].offsetWidth + gap;
      }
    }

    function updateDots() {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function updateCarousel() {
      var step = getStepSize();
      if (step <= 0) return;

      // 确保 currentIndex 不超过当前圆点总数
      var currentDots = getActiveDots();
      if (currentIndex >= currentDots.length) {
        currentIndex = 0;
      }

      var translateX = -currentIndex * step;
      track.style.transform = 'translateX(' + translateX + 'px)';

      // 更新当前激活的圆点
      dots.forEach(function (dot) {
        dot.classList.remove('active');
      });
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
      }
    }

    // 点击右箭头
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

    // 点击左箭头
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
    function bindDotClicks() {
      var allDots = document.querySelectorAll('.carousel-dot');
      allDots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          var index = parseInt(this.getAttribute('data-index'), 10);
          dots = getActiveDots();
          totalDots = dots.length;
          if (!isNaN(index) && index >= 0 && index < totalDots) {
            currentIndex = index;
            updateCarousel();
          }
        });
      });
    }
    bindDotClicks();

    // 窗口大小变化时重新计算
    window.addEventListener('resize', function () {
      dots = getActiveDots();
      totalDots = dots.length;
      if (currentIndex >= totalDots) {
        currentIndex = 0;
      }
      updateCarousel();
    });
  }

  // =====================
  // 初始化
  // =====================
  function init() {
    initHamburgerMenu();
    initTabSwitch();
    initCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
