const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema( 
    {
        date: { 
            type: String,
            required: true
        },
        image: { 
            type: String,
        },
        grateful: [String],
        willAccomplish: [String],
        affirmation: String,
        dump: String,
        rating: Number,
        achievements: [String],
        learn: String,
        improve: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        }
    }
);

const EntryModel = mongoose.model('Entry', entrySchema);

module.exports = EntryModel;