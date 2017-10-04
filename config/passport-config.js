const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');


// serializeUser: what to save in the session after logging in
passport.serializeUser((userFromDb, done) => {
    done(null, userFromDb._id);
});

// deserializeUser:  what will become "req.user"
passport.deserializeUser((idFromSession, done) => {
    UserModel.findById(
        idFromSession,
        (err, userFromDb) => {
            if (err) {
                done(err);
                return;
            }
            
            done(null, userFromDb);
                        // "userFromDb" becomes "req.user" in our routes
        }
    )
});

// Local Strategy from "passport-local"
// ----------------------------------
// Log in with username and password.

passport.use( 
    new LocalStrategy(
        {
            usernameField: 'loginEmail',
            passwordField: 'loginPassword'
        },

        (sentEmail, sentPassword, done)  => {
            UserModel.findOne(
                { email: sentEmail },
                (err, userFromDb) => {
                    if (err) {
                        done(err);
                        return;
                    }

                    if (!userFromDb) {
                        done(null, false, { message: 'Bad email'});
                        return;
                    }

                    const isPasswordGood = 
                        bcrypt.compareSync(sentPassword, userFromDb.encryptedPassword);

                    if (!isPasswordGood) {
                        done(null, false, { message: 'Bad password' })
                        return;

                    }
                    done(null, userFromDb);
                }    
            );
        }
    )
)