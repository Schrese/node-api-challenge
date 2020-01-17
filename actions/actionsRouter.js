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
router.get('/:id', validateActionId, (req, res) => {
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

//PUT updates an action (update()) - gets 2 args (id, changes)
router.put('/:id', validateActionId, (req, res) => {
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
router.delete('/:id', validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
        .then(deleted => {
            res.status(200).json({ message: 'Action successfully removed!' })
        })
        .catch(err => {
            console.oog('error deleting action', err)
            res.status(500).json({ errorMessage: 'The action could not be removed' })
        })
})

//checks to see that the action id is valid
function validateActionId(req, res, next) {
    const id = req.params.id;

    Actions.get(id)
        .then(actId => {
            if (actId) {
                next();
            } else {
                res.status(400).json({ message: 'Invalid action id' })
            }
        })
        .catch(err => {
            console.log('error getting this action by id', err)
            res.status(500).json({ errorMessage: 'There was an error getting this action id' })
        })
}


module.exports = router;