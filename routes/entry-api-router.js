const express = require('express');
// const multer = require('multer');
const EntryModel = require('../models/entry-model');

const router = express.Router();

// const myUploader = multer({
//     dest: __dirname + '/../public/uploads/'
// });

// localhost:3000/api/dashboard
router.get('/dashboard', (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ errorMessage: 'Not logged in.' });
        return;
    }

    EntryModel.find(
       {} // { user: req.user._id }
    )
        // .limit(7)
        .sort({ date: 1 })
        .exec((err, filteredEntries) => {
            if (err) {
                console.log('Error finding entries', err);
                res.status(500).json({ errorMessage: 'Finding entries went wrong'});
                return;
            }

            res.status(200).json(filteredEntries);
        });
});

router.post('/dashboard/new/:year/:month/:date', (req, res, next) => {
    
    if (!req.user) {
        res.status(401).json({ errorMessage: 'Not logged in.' });
        return;
    }

    const theEntry = new EntryModel({
        date: req.body.entryDate,
        // image: req.body.image,
        grateful: req.body.entryGrateful,
        willAccomplish: req.body.entryWillAccomplish,
        affirmation: req.body.entryAffirmation,
        dump: req.body.entryDump ,
        rating: req.body.entryRating,
        achievements: req.body.entryAchievements,
        learn: req.body.entryLearn,
        improve: req.body.entryImprove,
        user: req.user._id
    });
    // Upload image
    // if (req.file) {
    //     thePhone.image = '/uploads/' + req.file.filename;
    // }
    theEntry.save((err) => {
        if (theEntry.errors) {
            res.status(400).json({
                errorMessage: 'Validation failed',
                validationErrors: theEntry.errors
            });
            return;
        }

        if (err) {
            console.log('Error POSTING entry', err);
            res.status(500).json({ errorMessage: 'New entry went wrong' })
        }

        res.status(200).json(theEntry);
    });
});

module.exports = router;