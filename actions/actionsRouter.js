const express = require('express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');


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
//Might need to put this into projectsRouter
router.post('/', (req, res) => {
    const newAct = req.body;
    if (newAct.description.length === 0 || newAct.notes.length === 0) {
        res.status(400).json({ message: 'Please provie notes and description for this Action' })
    } else {
        Projects.get(newAct.project_id)
            Actions.insert(newAct)
            .then(newA => {
                res.status(201).json({newA})
            })
            .catch(err => {
                console.log('error creating new action', err)
                res.status(500).json({ errorMessage: 'Could not create a new Action' })
            })
    }
})


//PUT updates an action (update()) - gets 2 args (id, changes)
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedAct = req.body;
    if (updatedAct.description.length === 0 || updatedAct.notes.length === 0) {
        res.status(400).json({ message: 'Please provide notes and description for this action' })
    } else {
        Actions.update(id, updatedAct)
            .then(newA => {
                console.log('New Action', newA)
                res.status(200).json({ message: 'Action successfully updated!' })
            })
            .catch(err => {
                console.log('error updating action', err)
                res.status(500).json({ errorMessage: 'The action could not be modified' })
            })
    }
   
})

//DELETE removes an action by id (remove()) - takes in an id

module.exports = router;