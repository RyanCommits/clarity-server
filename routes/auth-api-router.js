const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const UserModel = require('../models/user-model');

const router = express.Router();

router.post('/process-signup', (req, res, next) => {
    // if (!req.body.signupUsername || !req.body.signupPassword || !req.body.signupFullName) {
    //     // if username or password is not provided, respond with json error
    //     res.status(400).json({ errorMessage: 'We need both username and password'});
    //     return;
    // }
    console.log(req.body)
    UserModel.findOne(
        { email: req.body.signupEmail },
        (err, userFromDb) => {
            if (err) {
                // if an error happened when finding email
                res.status(500).json({ errorMessage: 'Error finding user email.'})
                return;
            }

            if (userFromDb) {
                // if email is taken
                res.status(400).json({ errorMessage: 'Email is taken.'});
                return;
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(req.body.signupPassword, salt);

            const theUser = new UserModel({
                firstName: req.body.signupFirstName,
                lastName: req.body.signupLastName,
                email: req.body.signupEmail,
                encryptedPassword: hashPass
            });

            console.log('this happened');
            theUser.save((err) => {
                if (err) {
                    res.status(500).json({ errorMessage: 'Error saving user.' });
                    return;
                }
                
                // wipe out variable before passing to the frontend
            
                req.login(theUser, (err) => {
                    if (err) {
                        console.log('User auto-login error', err);
                        res.status(500).json({ errorMessage: 'Error loggin in user.'});
                        return;
                    }
             
                    theUser.encryptedPassword = undefined;
                    res.status(200).json(theUser);  
                 });
            });
        }

    )
});

router.post('/process-login', (req, res, next) => {
    const customAuthCallback = 
        passport.authenticate('local', (err, theUser, extraInfo) => {
            if (err) {
                res.status(500).json({ errorMessage: 'Login failed.' });
                return;
            }

            if (!theUser) {
                res.status(401).json({ errorMessage: extraInfo.message });
                return;
            }

            req.login(theUser, (err) => {
                if (err) {
                    res.status(500).json({ errorMessage: 'Login failed.'});
                }

                theUser.encryptedPassword = undefined;
                res.status(200).json(theUser);
            })
        }); 
    
    customAuthCallback(req, res, next);
});

router.get('/checklogin', (req, res, next) => {
    let amILoggedIn = false;

    if (req.user) {
        req.user.encryptedPassword = undefined;
        amILoggedIn = true;
    }

    res.status(200).json(
        {
            isLoggedIn: Boolean(req.user),
            userInfo: req.user
        }
    );
});

module.exports = router;