'use strict';

function open_apply_form() {
  $('.apply_form').addClass('open');

  $('.apply_form .content').animate({
    marginRight: '0'
  }, 500, function () {
    $('.apply_form .content form input')[0].focus();
  });
}

function close_apply_form() {
  var ww = $(window).width();
  var marginRightToApply = '-50vw';
  if (ww <= 1100) {
    marginRightToApply = '-100vw';
  }
  $('.apply_form .content').animate({
    marginRight: marginRightToApply
  }, 500, function () {
    $('.apply_form').removeClass('open');
  });
}

$('.apply_form').click(function () {
  close_apply_form();
});

$('.apply_form .content').click(function (event) {
  event.stopPropagation();
});

/**
 * On keyup
 */
$('.apply_form .content form input').keyup(function (e) {
  var _e$target = e.target;
  var value = _e$target.value;
  var type = _e$target.type;

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

$('.apply_form .content form input').focusout(function (e) {
  var _e$target2 = e.target;
  var value = _e$target2.value;
  var type = _e$target2.type;

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

$('.apply_form__register-button').focusin(function () {
  if (enableSubmitFnc()) {
    $('.apply_form--push-enter').addClass('active');
  }
});

$('.apply_form__register-button').focusout(function () {
  $('.apply_form--push-enter').removeClass('active');
});

$('.apply_form form').submit(function (e) {
  /*e.preventDefault();*/
  if (enableSubmitFnc()) {
    var data = $('.apply_form form').serialize();
    $('.apply_form--sending-message').show();
    /*alert(data);*/
  }
  /*return false;*/
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

function enableSubmitFnc() {
  var enableSubmit = true;
  $('.apply_form .content form input').map(function () {
    var val = $(this).val();
    var hasClassError = $(this).hasClass('error');
    if (!val || hasClassError) {
      enableSubmit = false;
    }
  });
  return enableSubmit;
}