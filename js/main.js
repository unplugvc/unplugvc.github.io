---
---

const state = {
  currentTab: 1,
  ww: $(window).width(),
  baseurl: '/',
  initialScrolltopScheduleMenu: 0,
  menu_voices_scrolltop: []
};

/**
 * Document ready
 */
$(document).ready(() => {
  Pace.on('done', () => {
    $(`.page_overlay .page_overlay__white_space`).addClass('animation');
    setTimeout(function() {
      $('.pace').fadeOut();
    }, 500);
    setTimeout(function() {
      $(`.page_overlay`).addClass('animation');
      $('.pace').hide();
      setTimeout(function() {
        $(`.header__home`).addClass('animation');
        $(`.header__event`).addClass('animation');
        $(`.header__mountain-profile`).addClass('animation');
      }, 1000);
    }, 3000);
  });

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
    slidesToShow: 4,
    centerMode: false,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500
  });

  $('[data-fancybox="gallery"]')
    .not($('.slick-cloned'))
    .fancybox({
      loop: true,
      buttons: ['close']
    });

  let scheduleMenuWidth =
    $('.schedule__line-date-element-sizer--mobile li').length * 88 + 100;
  if (state.ww > scheduleMenuWidth) {
    scheduleMenuWidth = state.ww;
  }

  $('.schedule__line-date-element-sizer--mobile .line_background').css({
    width: `${scheduleMenuWidth}px`
  });

  /**
   * Lazy loading on enter
   */
  update_offsets_backgrounds();
  lazy_backgrounds();
  /**
   * Using negative toggle
   */
  negativeMenuToggle();
  /**
   * Play video
   */
  playVideo();
  /**
   * Scroll reveal
   */
  window.sr = ScrollReveal({
    duration: 1000,
    scale: 1,
    distance: '100px'
  });
  sr.reveal('.scroll_reveal');
  $(`.schedule__tabs`).height($(`.tab__${state.currentTab}`).height() + 80);
});

/**
 * Scroll listener
 */
$(document).scroll(() => {
  /**
   * Using negative toggle
   */
  negativeMenuToggle();
  /**
   * Lazy background on scroll
   */
  lazy_backgrounds();
  /**
   * Play video
   */
  playVideo();

  if (!state.menu_voices_scrolltop.length && $('#about').length) {
    state.menu_voices_scrolltop = [
      ['#about', $('#about').offset().top],
      ['#schedule', $('#schedule').offset().top],
      ['#past_editions', $('#past_editions').offset().top],
      ['#contacts', $('#contacts').offset().top]
    ];
  }

  if ($('#about').length) {
    let current_id = 0;
    for (let i = 0; i < state.menu_voices_scrolltop.length; i++) {
      let scrollTop = state.menu_voices_scrolltop[i][1] - 160;
      if (i == 1) {
        scrollTop = scrollTop - 160;
      } else if (i == 0) {
        scrollTop = scrollTop - 200;
      }
      if ($(document).scrollTop() >= scrollTop) {
        current_id = i;
      }
  
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        current_id = 3;
      }
    }
    $('.top_navbar__menu a').css({ borderBottom: '0px' });
    $('.top_navbar__menu a')
      .eq(current_id)
      .css({ borderBottom: '3px solid #9d774f' });
    if ($(document).scrollTop() < state.menu_voices_scrolltop[0][1] - 50) {
      $('.top_navbar__menu a')
      .eq(0)
      .css({ borderBottom: '0px' });
    }
  }
});

/**
 * Open the menu on mobile
 */
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
  let ww = $(window).width();

  $(`.tabselector__${state.currentTab}`).removeClass('active');
  state.currentTab = id;
  $(`.schedule__tabs`).height($(`.tab__${id}`).height() + 80);
  $('html,body').stop(true);
  if (ww < 769) {
    let nextPosition = $('.schedule__tabs').offset().top - 200;
    $('html,body').animate({ scrollTop: nextPosition }, function() {
      $(`.tabselector__${state.currentTab}`).addClass('active');
      $(`.tab__1`).css({ marginLeft: `-${100 * (state.currentTab - 1)}%` });
    });
  } else {
    state.currentTab = id;
    $(`.tabselector__${state.currentTab}`).addClass('active');
    $(`.tab__1`).css({ marginLeft: `-${100 * (state.currentTab - 1)}%` });
  }
}

/**
 * Debounced window resize
 */
var onResizeDebounced = debounce(() => {
  if ($(window).width() > 769) {
    $('.open_menu').html('MENU');
    $('.top_navbar--mobile-content').removeClass('show');
  }
  state.ww = $(window).width();
  let scheduleMenuWidth =
    $('.schedule__line-date-element-sizer--mobile li').length * 88 + 100;
  if (state.ww > scheduleMenuWidth) {
    scheduleMenuWidth = state.ww;
  }

  $('.schedule__line-date-element-sizer--mobile .line_background').css({
    width: `${scheduleMenuWidth}px`
  });

}, 150);

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

/**
 * Negative toggle navbar
 */

function negativeMenuToggle() {
  let limit = 100;
  let ww = $(window).width();
  if (ww < 769) {
    limit = 0;
  }

  if ($(document).scrollTop() > limit) {
    $('.top_navbar').addClass('negative');
    $('.top_navbar--mobile').addClass('negative');
  } else {
    $('.top_navbar').removeClass('negative');
    $('.top_navbar--mobile').removeClass('negative');
  }

  if (ww < 769) {
    let windowScrolltop = $(window).scrollTop();
    if ($('.schedule__line-container').length) {
      let menuScrolltop = $('.schedule__line-container').offset().top - 76;
      if (windowScrolltop > menuScrolltop) {
        if (!state.initialScrolltopScheduleMenu) {
          state.initialScrolltopScheduleMenu = menuScrolltop;
        }
        if (
          windowScrolltop >
          state.initialScrolltopScheduleMenu +
            $('.schedule__tabs').height() +
            50
        ) {
          $('.schedule__line-date-element-sizer--mobile').removeClass(
            'sticky-schedule-modifier'
          );
        } else {
          $('.schedule__line-date-element-sizer--mobile').addClass(
            'sticky-schedule-modifier'
          );
        }
      } else {
        if (windowScrolltop < state.initialScrolltopScheduleMenu) {
          $('.schedule__line-date-element-sizer--mobile').removeClass(
            'sticky-schedule-modifier'
          );
        }
      }
    }
  }
}

/**
 * Lazyloading for backgrounds
 */
var ll = $('.lazyload-bkg');
var lh = [];
var wscroll = 0;
var wh = $(window).height();

function update_offsets_backgrounds() {
  $('.lazyload-bkg').each(function() {
    var x = $(this).offset().top;
    lh.push({ offset: x, src: $(this).data('src') });
  });
}

let lazy_backgrounds = debounce(() => {
  wscroll = $(window).scrollTop();
  for (let i = 0; i < lh.length; i++) {
    if (lh[i].offset <= wscroll + (wh + 150)) {
      $('.lazyload-bkg')
        .eq(i)
        .css({
          backgroundImage: `url('${lh[i].src}')`
        });
    }
  }
});

function playVideo() {
  if (document.getElementById('event_video')) {
    let vid = document.getElementById('event_video');
    let wscroll = $(window).scrollTop();
    if ($('#event_video').offset().top <= wscroll + (wh + 100)) {
      vid.play();
    }
  }
}

/**
 * Smooth scroll on link click
 */
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          function() {
            var $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            }
          }
        );
      }
    }
  });
