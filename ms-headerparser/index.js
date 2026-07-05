var http = require('http');
const PORT = process.env.PORT || 5000;

function handleRequest(request, response) {

  try {
    var useragent = require('useragent');
    var parser = require('accept-language-parser');

    var languages = parser.parse(request.headers['accept-language']);
    if(languages[0]){
      languages = languages[0].code;
    } else {
      languages = 'unknown';
    }

    var agent = useragent.parse(request.headers['user-agent']);
    agent.toAgent(); // 'Chrome 15.0.874'
    agent.os.toString(); // 'Mac OSX 10.8
    var returnObj = {
      //headers: JSON.stringify(request.headers,'','  '),
      language: languages,
      os: agent.os.toString(),
      browser: agent.toAgent(),
      ip: request.headers['x-forwarded-for']
    };
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(returnObj, '', '  '));
  }
  catch (error) {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(error, '', '  '));

  }
}

var server = http.createServer(handleRequest);
server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});