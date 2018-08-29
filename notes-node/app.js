const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};


const notes = require('./notes.js');
const argv = yargs
    .command('add', 'Add a new note',{
      title: titleOptions,
      body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
      title: titleOptions
    })
    .command('remove', 'Remove a note',{
      title: titleOptions
    })
    .help()
    .argv;

var command = argv._[0];

switch(command) {
  case 'add':
    var note = notes.addNote(argv.title, argv.body);
    if(note === undefined) {
      console.log("Note already exists");
    }else{
      console.log("Note successfully added");
      notes.logNote(note);
    }

  break;
  case 'list':
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note) );
  break;
  case 'read':
    var note = notes.getNote(argv.title);
    if(note === undefined) {
      console.log("Note not found");
    }else{
      notes.logNote(note);
    }
  break;
  case 'remove':
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
  break;
  default:
  console.log('Command not recognized');
}
