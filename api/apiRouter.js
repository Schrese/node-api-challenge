const express = require('express');

const router = express.Router();
const projectsRouter = require('../projects/projectsRouter.js');
const actionsRouter = require('../actions/actionsRouter.js');

router.get('/', (req, res) => {
    res.send(`<h2>I really hope this route works</h2>`)
})

router.use('/projects', projectsRouter);
router.use('/actions', actionsRouter);

module.exports = router;