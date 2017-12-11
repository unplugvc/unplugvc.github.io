---
---
const state = {
  currentTab: 1,
  ww: $(window).width(),
  baseurl: 'ventureretreat/'
};

/**
 * Document ready
 */
$(document).ready(() => {
  /**
   * Init tabs
   */
  $(`.tab__${state.currentTab}`).show();
  $(`.tabselector__${state.currentTab}`).addClass('active');
  /**
   * Init sliders
   */
  $('.carousel__home-slider_1').slick({
    dots: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500
  });

  $('.carousel__home-slider_2').slick({
    dots: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500
  });

  $('[data-fancybox="gallery"]')
    .not($('.slick-cloned'))
    .fancybox({
      buttons: ['slideShow', 'fullScreen', 'thumbs', 'share', 'close']
    });

  let top = $('.sticky-scroll-box-mobile').offset().top;
  $(window).scroll(event => {
    if ($(window).width() < 769) {
      let y = $(this).scrollTop();
      if (y >= top) $('.sticky-scroll-box-mobile').addClass('fixed');
      else $('.sticky-scroll-box-mobile').removeClass('fixed');
      $('.sticky-scroll-box-mobile').width(
        $('.sticky-scroll-box-mobile')
          .parent()
          .width()
      );
    }
  });
});

/**
 * Scroll listener
 */
$(document).scroll(() => {
  let limit = 100;
  if ($(window).width() < 769) {
    limit = 0;
  }

  if ($(document).scrollTop() > limit) {
    $('.top_navbar').addClass('negative');
    $('.top_navbar--mobile').addClass('negative');
    $('.top_navbar__logo img')
      .attr('src', `/${state.baseurl}/assets/img/icons/logo/logo_negative.png`)
      .css({ width: '100%' });
  } else {
    $('.top_navbar__logo img')
      .attr('src', `/${state.baseurl}/assets/img/icons/logo/logo.png`)
      .css({ width: '100%' });
    $('.top_navbar').removeClass('negative');
    $('.top_navbar--mobile').removeClass('negative');
  }
});

$('.open_menu').click(() => {
  /**
   * Change the text of button menu content toggle
   */

  if ($('.top_navbar--mobile-content.show').length) {
    $('.top_navbar--mobile-content').removeClass('show');
    $('.open_menu').html('MENU');
  } else {
    $('.top_navbar--mobile-content').addClass('show');
    $('.open_menu').html('CLOSE');
  }
});

function displayScheduleTab(id) {
  $(`.tabselector__${state.currentTab}`).removeClass('active');
  $(`.tab__${state.currentTab}`).hide();
  state.currentTab = id;
  $(`.tab__${state.currentTab}`).show();
  $(`.tabselector__${state.currentTab}`).addClass('active');
}

/**
 * Debounced window resize
 */

var onResizeDebounced = debounce(() => {
  if ($(window).width() > 769) {
    $('.open_menu').html('MENU');
    $('.top_navbar--mobile-content').removeClass('show');
  }
}, 250);

window.addEventListener('resize', onResizeDebounced);

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
