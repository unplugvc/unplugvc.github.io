---
---

function open_apply_form() {
  $('.apply_form').addClass('open');

  $('.apply_form .content').animate(
    {
      marginRight: '0'
    },
    500,
    () => {}
  );
}

function close_apply_form() {
  console.log('yolo close');
  $('.apply_form .content').animate(
    {
      marginRight: '-50vw'
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

$('.apply_form .content form input').blur(e => {
  const { value, type } = e.target;
  if (value.length) {
    if (type == 'text') {
      $(e.target).addClass('valid');
      $(e.target).removeClass('error');
    }
    if (type == 'email') {
      console.log(value, validateEmail(value));
      if (validateEmail(value)) {
        $(e.target).addClass('valid');
        $(e.target).removeClass('error');
        $('.apply_form__error_message.mail').html("");
      } else {
        $(e.target).removeClass('valid');
        $(e.target).addClass('error');
        $('.apply_form__error_message.mail').html("Wrong mail format!");
      }
    }
  } else {
    $(e.target).removeClass('valid');
    $(e.target).removeClass('error');
  }
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
