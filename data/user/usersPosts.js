const express = require('express');
const posts = require('../db');
const router = express.Router();

router.post('/api/posts', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post."
        })
    }
    posts.insert(req.body)
        .then((posts) => {
            res.status(201).json(posts);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

router.get('/api/posts', (req, res) => {
    posts.find(req.query)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The posts information could not be retrieved."
            })
        })
});

router.get('/api/posts/:id', (req, res) => {
    posts.findById(req.params.id)
        .then((posts) => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The post information could not be retrieved."
            })
        })
})

router.put('/api/posts/:id', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            Message: "Please provide title and contents for the post." 
        })
    }
    posts.update(req.body)
        .then((posts) => {
            if (req.params.id) {
            res.status(200).json(posts);
            } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The post information could not be modified."
            })
        }) 
        
})

router.delete("/api/posts/:id", (req, res) => {
    posts.remove(req.params.id)
        .then((post) => {
            if (post > 0) {
                res.status(200).json({
                message: "Post deleted"
            })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
        }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The post could not be removed"
            })
        })
})

module.exports = router;