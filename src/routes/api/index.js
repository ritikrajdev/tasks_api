const router = require('express').Router();

const taskRoutes = require('./taskRoutes');
const db = require('../../models/');

router.use('/tasks', taskRoutes);

router.get('/users', async (req, res) => {
  const ans = await db.user.findAll({
    include: db.Task
  });

  res.json(ans);
});

module.exports = router;
