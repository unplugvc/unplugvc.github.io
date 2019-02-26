<<<<<<< HEAD
"use strict";function open_apply_form(){$(".apply_form").addClass("open"),$(".apply_form .content").animate({marginRight:"0"},500,function(){$(".apply_form .content form input")[0].focus()})}function close_apply_form(){var a=$(window).width(),t="-50vw";a<=1100&&(t="-100vw"),$(".apply_form .content").animate({marginRight:t},500,function(){$(".apply_form").removeClass("open")})}function validateEmail(a){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a.toLowerCase())}function enableSubmitFnc(){var a=!0;return $(".apply_form .content form input").map(function(){var t=$(this).val(),e=$(this).hasClass("error");t&&!e||(a=!1)}),a}$(".apply_form").click(function(){close_apply_form()}),$(".apply_form .content").click(function(a){a.stopPropagation()}),$(".apply_form .content form input").keyup(function(a){var t=a.target,e=t.value,r=t.type;e.length?($(a.target).addClass("valid"),$(a.target).removeClass("error"),"email"==r&&$(".apply_form__error_message.mail").html("")):($(a.target).removeClass("valid"),$(a.target).removeClass("error")),enableSubmitFnc()&&validateEmail($(".apply_form input[type=email]").val())?$(".apply_form__register-button").addClass("active"):($(".apply_form__register-button").removeClass("active"),$(".apply_form--push-enter").removeClass("active"))}),$(".apply_form .content form input").focusout(function(a){var t=a.target,e=t.value,r=t.type;e.length?"email"!=r||validateEmail($(a.target).val())||$(".apply_form__error_message.mail").html("Wrong mail format!"):"email"==r&&$(".apply_form__error_message.mail").html("")}),$(".apply_form__register-button").focusin(function(){enableSubmitFnc()&&$(".apply_form--push-enter").addClass("active")}),$(".apply_form__register-button").focusout(function(){$(".apply_form--push-enter").removeClass("active")}),$(".apply_form form").submit(function(){if(enableSubmitFnc()){$(".apply_form form").serialize();$(".apply_form--sending-message").show()}});
=======
---
---

function open_apply_form() {
  $('.apply_form').addClass('open');

  $('.apply_form .content').animate(
    {
      marginRight: '0'
    },
    500,
    () => {
      $('.apply_form .content form input')[0].focus();
    }
  );
}

function close_apply_form() {
  let ww = $(window).width();
  let marginRightToApply = '-50vw';
  if (ww <= 1100) {
    marginRightToApply = '-100vw';
  }
  $('.apply_form .content').animate(
    {
      marginRight: marginRightToApply
    },
    500,
    () => {
      $('.apply_form').removeClass('open');
    }
  );
}

$('.apply_form').click(() => {
  close_apply_form();
});

$('.apply_form .content').click(event => {
  event.stopPropagation();
});

/**
 * On keyup
 */
$('.apply_form .content form input').keyup(function(e) {
  const { value, type } = e.target;
  if (value.length) {
    $(e.target).addClass('valid');
    $(e.target).removeClass('error');
    if (type == 'email') {
      $('.apply_form__error_message.mail').html('');
    }
  } else {
    $(e.target).removeClass('valid');
    $(e.target).removeClass('error');
  }
  if (enableSubmitFnc()) {
    /**
     * Enabling the submit button
     */
    if (!validateEmail($('.apply_form input[type=email]').val())) {
      $('.apply_form__register-button').removeClass('active');
      $('.apply_form--push-enter').removeClass('active');
    } else {
      $('.apply_form__register-button').addClass('active');
    }
  } else {
    $('.apply_form__register-button').removeClass('active');
    $('.apply_form--push-enter').removeClass('active');
  }
});


$('.apply_form .content form input').focusout(function(e) {
  const { value, type } = e.target;
  if (!value.length) {
    if (type == 'email') {
      $('.apply_form__error_message.mail').html('');
    }
  } else {
    if (type == 'email' && !validateEmail($(e.target).val())) {
      $('.apply_form__error_message.mail').html('Wrong mail format!');
    }
  }
});

$('.apply_form__register-button').focusin(function() {
  if (enableSubmitFnc()) {
    $('.apply_form--push-enter').addClass('active');
  }
});

$('.apply_form__register-button').focusout(function() {
  $('.apply_form--push-enter').removeClass('active');
});

$('.apply_form form').submit(function(e) {
  /*e.preventDefault();*/
  if (enableSubmitFnc()) {
    var data = $('.apply_form form').serialize();
    $('.apply_form--sending-message').show();
    /*alert(data);*/
  }
  /*return false;*/
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase());
}

function enableSubmitFnc() {
  let enableSubmit = true;
  $('.apply_form .content form input').map(function() {
    let val = $(this).val();
    let hasClassError = $(this).hasClass('error');
    if (!val || hasClassError) {
      enableSubmit = false;
    }
  });
  return enableSubmit;
}
>>>>>>> devel
