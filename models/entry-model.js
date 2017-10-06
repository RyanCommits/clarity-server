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
        freeText: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
            // required: true
        }
    }
);

const EntryModel = mongoose.model('Entry', entrySchema);

module.exports = EntryModel;