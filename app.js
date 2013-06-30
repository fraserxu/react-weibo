var static = require('node-static');

var fileServer = new static.Server('./app');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}).listen(process.env.VCAP_APP_PORT || 8080);