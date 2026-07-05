var global = window;
global.xhr = $.ajax();
global.search = function(str) {
  $("#results").empty();
  if (str.length >= 2) {
    global.xhr.abort();
    global.xhr = $.ajax({
      url: '//en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: str,
        format: 'json'
      },
      dataType: 'jsonp',
      success: function(x) {
        if (typeof x.query !== undefined) {
          console.log(x);
          var results = x.query.search;
          for (var i = 0; i < results.length; i++) {
            var url = 'https://en.wikipedia.org/wiki/' + results[i].title;
            var html = '';
            html += '<div class="result col-md-12" id="' + i + '">';
            html += '<a target="_blank" href="' + url + '">';
            html += '<div class="col-md-4 title">' + results[i].title + '</div>';
            html += '</a>';
            html += '<div class="col-md-8  snippet">' + results[i].snippet + '</div></div>'
            $('#results').append(html)
          }
        }
      },
      failure: function(x) {
        console.log('test');
      }
    });
  }
};
global.random = function() {
  global.xhr.abort();
  $("#results").empty();
    global.xhr = $.ajax({
    url: '//en.wikipedia.org/w/api.php',
    data: {
      action: 'query',
      generator: 'random',
      format: 'json'
    },
    dataType: 'jsonp',
    success: function(x) {
      global.result = x.query.pages;
      for (var z in global.result) {
        if (global.result[z].title.indexOf(':') > -1) {
          global.random();
        } else {
          $('#search').val(global.result[z].title);
          global.search(global.result[z].title);
        }
      }
    }
  });
};
$(function() {
 $("#search").keyup(function() {
    global.search($('#search').val());
  });
  $("#random").click(function() {
    global.random();
  });
});