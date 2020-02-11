'use strict';

var SwaggerExpress = require('swagger-express-mw');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  console.log('server is running on http://127.0.0.1:'+port);

  // if (swaggerExpress.runner.swagger.paths['/hello']) {
  //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  // }
});
