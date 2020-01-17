const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel.js')
const Actions = require('../data/helpers/actionModel.js')

//GET all projects (get())
router.get('/', (req, res) => {
    Projects.get()
        .then(proj => {
            res.status(201).json(proj)
        })
        .catch(err => {
            console.log('error getting all projects', err)
            res.status(500).json({ errorMessage: "The projects could not be found." })
        })
})

//GET projects by id (get()) - takes in an id
router.get('/:id', validateId, (req, res) => {
    const id = req.params.id;

    Projects.get(id)
        .then(proj => {
            res.status(200).json(proj)
        })
        .catch(err => {
            console.log('error getting project from this id', err)
            res.status(500).json({ errorMessage: "The project associated with that id could not be found." })
        })
})

//GET project actions (getProjectActions()) - takes in PROJECT ID
//this may need to go to actionsRouter
router.get('/:id/actions', validateId, (req, res) => {
    const id = req.params.id;

    Projects.getProjectActions(id)
        .then(act => {
            res.status(200).json(act)
        })
        .catch(err => {
            console.log('error getting actions from this id', err)
            res.status(500).json({ errorMessage: "The actions associated with that project id could not be found." })
        })
})


//POST adds a project (insert()) - name and description are required bodies
router.post('/', (req, res) => {
    const newProj = req.body;
    if(newProj.name.length === 0 || newProj.description.length === 0 ) {
        res.status(400).json({ message: 'Please provide both name and description for this project' })
    } else {
        Projects.insert(newProj)
            .then(newP => {
                res.status(201).json({newP})
            })
            .catch(err => {
                console.log('error creating a new project', err)
                res.status(500).json({ errorMessage: 'Could not create a new project' })
            })
    }
})


//PUT updates a project (update()) - gets 2 args (id, changes)
router.put('/:id', validateId, (req, res) => {
    let id = req.params.id;
    let updatedProj = req.body;
    if (updatedProj.name.length === 0 || updatedProj.description.length === 0) {
        res.status(400).json({ message: 'Please provide both name and description for this project' })
    } else {
        Projects.update(id, updatedProj)
            .then(upDated => {
                console.log(upDated)
                res.status(200).json({ message: 'Project successfully updated!' })
            })
            .catch(err => {
                console.log('error updating this project', err)
                res.status(500).json({ errorMessage: 'The project could not be modified' })
            })
    }
})

//DELETE deletes a project (remove()) - takes in an id
router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id;

    Projects.remove(id)
        .then(deleted => {
            res.status(200).json({ message: 'Project successfully removed!' })
        })
        .catch(err => {
            console.log('error deleting project', err)
            res.status(500).json({ errorMessage: 'The project could not be removed' })
        })
})

//creates a new action on a project
router.post('/:id/actions', validateId, (req, res) => {
    const id = req.params.id;
    const newAct = req.body;
    const singleObj = {project_id: id, description: newAct.description, notes: newAct.notes}
    if (newAct.description.length === 0 || newAct.notes.length === 0) {
        res.status(400).json({ message: 'Please provie notes and description for this Action' })
    } else {
        // Projects.get(newAct.project_id)
        Actions.insert(singleObj)
            .then(newA => {
                res.status(201).json({newA})
            })
            .catch(err => {
                console.log('error creating new action', err)
                res.status(500).json({ errorMessage: 'Could not create a new Action' })
            })
    }
})

//checks to see that the id is valid
function validateId(req, res, next) {
    const id = req.params.id;
    
    Projects.get(id)
        .then(theId => {
            if (theId) {
                next();
            } else {
                res.status(400).json({ message: 'Invalid project id' })
            }
        })
        .catch(err => {
            console.log('error getting this project by id', err)
            res.status(500).json({ errorMessage: 'There was an error getting this project id' })
        })
}


module.exports = router;