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
  console.log('yolo close');
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

$('.apply_form .content form input').keydown(e => {
  const { value, type } = e.target;
  if (value.length) {
    /*if (type == 'text') {*/
    $(e.target).addClass('valid');
    $(e.target).removeClass('error');
    /*}*/
  } else {
    if (type == 'email') {
      $('.apply_form__error_message.mail').html('Required');
    }
    $(e.target).removeClass('valid');
    $(e.target).removeClass('error');
    if (type == 'email') {
      $('.apply_form__error_message.mail').html('');
    }
  }
  if (enableSubmitFnc()) {
    /**
     * Enabling the submit button
     */
    if (type == 'email' && !validateEmail(value)) {
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

$('.apply_form__register-button').focusin(function() {
  if (enableSubmitFnc()) {
    $('.apply_form--push-enter').addClass('active');
  }
});

$('.apply_form__register-button').focusout(function() {
  $('.apply_form--push-enter').removeClass('active');
});

$('.apply_form form').submit(function(e) {
  e.preventDefault();
  if (enableSubmitFnc()) {
    var data = $('.apply_form form').serialize();
    alert(data);
  }
  return false;
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
