/**
 * 70mai A800SE-SpeedEye — 滚动入场动画
 * 参考 index_加载.html 的 Intersection Observer 方案优化
 * 支持区块整体 + 内部元素交错动画
 */
(function () {
  'use strict';

  function initScrollAnimations() {
    // =====================
    // 1. 区块级观察器 — 整个 section 进入视口时触发
    // =====================
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // 观察所有 .anim-hidden 元素（区块级）
    document.querySelectorAll('.anim-hidden').forEach(function (el) {
      sectionObserver.observe(el);
    });

    // =====================
    // 2. 元素级交错观察器 — 内部子元素逐个出现
    // =====================
    const staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    // 观察卡片级元素实现交错效果
    document.querySelectorAll(
      '.text-wrapper_3, .text-wrapper_4, ' +
      '.text-wrapper_5, .text-wrapper_6, ' +
      '.text-wrapper_7, .text-wrapper_8, ' +
      '.box_7, .box_9, .box_10, .box_11, ' +
      '.text-wrapper_15, .text-wrapper_16, .text-wrapper_17, ' +
      '.box_3, .box_4, ' +
      '.image_3, .image_4, ' +
      '.image_5, .image_6, .image_12, .image_13'
    ).forEach(function (el) {
      // Only observe if not already covered by section observer
      if (!el.closest('.anim-hidden') || el.closest('.anim-hidden.visible')) {
        // Already visible, skip
      }
      staggerObserver.observe(el);
    });

    // =====================
    // 3. 导航栏滚动效果
    // =====================
    var nav = document.querySelector('.box_1');
    if (nav) {
      window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // =====================
    // 4. 平滑滚动（导航锚点）
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          var offset = 128; // navbar height
          var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
