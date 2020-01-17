const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel.js');


//GET all actions by project id (get())
router.get('/', (req, res) => {
    Actions.get()
        .then(acts => {
            res.status(200).json(acts)
        })
        .catch(err => {
            console.log('error getting all actions', err)
            res.status(500).json({ errorMessage: 'Could not retrieve Actions' })
        })
})

//GET actions by id (get()) - takes in an id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then(act => {
            res.status(200).json(act)
        })
        .catch(err => {
            console.log('error getting action by id', err)
            res.status(500).json({ errorMessage: 'Could not retrieve this Action' })
        })
})

//POST adds an action (insert()) - description and notes required, completed is optional


//PUT updates an action (update()) - gets 2 args (id, changes)

module.exports = router;