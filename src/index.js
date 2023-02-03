const express = require('express');

const {PORT} = require('./config');
const { errorHandlingMiddleware } = require('./middlewares');

const app = express();

app.use(express.json());

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log('server started visit http://localhost:3000');
});
