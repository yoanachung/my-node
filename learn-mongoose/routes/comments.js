const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');

router.get('/:id', (req, res, next) => {
    Comment.find({ commenter: req.params.id })
        .then((comments) => {
            res.json(comments);
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

router.patch('/:id', (req, res, next) => {
    Comment.update({ _id: req.params.id }, { comment: req.body.comment })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

router.delete('/:id', (req, res, next) => {
    Comment.remove({ _id: req.params.id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

router.post('/', (req, res, next) => {
    const comment = new Comment({
        commenter: req.body.id,
        comment: req.body.comment,
    });

    comment.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

module.exports = router;
