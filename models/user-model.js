const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema( 
    {
        firstName: { 
            type: String,
            required: [true, 'What\'s your first name?.']
        },
        lastName: { 
            type: String,
            required: [true, 'What\'s your last name?.']
        },
        email: {
            type: String,
            required: [true, 'Email is required' ]
        }, 
        encryptedPassword: {
            type: String,
            required: [true, 'Password is required.']
        }
    },

    {
        timestamps: true
    }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;