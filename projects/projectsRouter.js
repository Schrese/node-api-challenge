const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel.js')

//GET all projects (get())
//does not work, not sure why. I don't think there is a "get all" in this db????
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
router.get('/:id', (req, res) => {
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


//POST adds a project (insert()) - name and description are required bodies


//PUT updates a project (update()) - gets 2 args (id, changes)


//DELETE deletes a project (remove()) - takes in an id


module.exports = router;