const mongoose = require('mongoose');

const EntryModel = require('../models/entry-model.js');

mongoose.connect('mongodb://localhost/server');

const entryArray = [
    {
      freeText: 'Ryans freak',
      date: '2017-10-7'
    },
    {
        freeText: 'Dues leak',
        date: '2017-10-9'
    },
    {
        freeText: 'Dues leak',
        date: '2017-10-8'
    }
];

EntryModel.create(
    // 1st argument -> array of entries to save
    entryArray,
  
    // 2nd argument -> callback
    (err, entriesAfterSave) => {
        if (err) {
            console.log('Create error 😅');
            console.log(err);
            return;
        }
  
        entriesAfterSave.forEach((oneEntry) => {
            console.log('New Entry ---> ' + oneEntry.freeText);
        });
    }
  );