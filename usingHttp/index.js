const http = require('http');

const {PORT} = require('./config');
const {getRouteController} = require('./routes');

const requestHandler = (req, res) => {
  const routeController = getRouteController(req);
  console.log(routeController);
  routeController(req, res);
};

const server = http.createServer(requestHandler);
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`);
});
