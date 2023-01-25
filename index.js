const  express = require('express');

const {PORT} = require('./config');
const {
  getTaskListController,
  createTaskController,
  getTaskDetailController,
  patchTaskController,
  deleteTaskController,
} = require('./controllers');


const app = express();
app.use(express.json());


app.get('/tasks',getTaskListController);
app.post('/tasks',createTaskController);

app.get('/tasks/:id', getTaskDetailController);
app.patch('/tasks/:id', patchTaskController);
app.delete('/tasks/:id', deleteTaskController);


app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`);
});
