/* global $ */
$(document).ready(function () {
  $('#ajax-submit').click(function () {
    $('fieldset').prop('disabled', true);
    if (!$('form')[0].checkValidity()) {
      // If the form is invalid, submit it. The form won't actually submit;
      // this will just cause the browser to display the native HTML5 error messages.
      $('#submit').click();
      return false;
    }
    var parsedUrl = new URL(window.location.href);
    var title = $('#comments').val().substring(0, 30);
    var body = '';
    body += 'Name: ' + $('#name').val() + '<br/>';
    body += 'Email: ' + $('#email').val() + '<br/>';
    body += 'Referrer: ' + parsedUrl.searchParams.get('source') + '<br/>';
    body += 'Contact them: ' + $('#dropdown').val() + '<br/>';
    body += 'Comments: ' + $('#comments').val().replace(/\n/gm, '<br/>');
    var data = {
      endpoint: 'jacebenson/blog',
      title: title,
      body: body,
      labels: $('input[name=radios]:checked', '#survey-form').val()
    };
    console.log(data);
    var settings = {
      'async': true,
      'crossDomain': true,
      'url': 'https://gitlab-issue.glitch.me/api/issue',
      'method': 'POST',
      'headers': {
        'content-type': 'application/json'
      },
      'processData': false,
      'data': JSON.stringify(data)
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      $('#myModal').modal('show');
    });
  });
});
