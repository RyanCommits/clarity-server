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
        .sort({ date: -1 })
        .exec((err, filteredEntries) => {
            if (err) {
                console.log('Error finding entries', err);
                res.status(500).json({ errorMessage: 'Finding entries went wrong'});
                return;
            }

            res.status(200).json(filteredEntries);
        });
});

module.exports = router;