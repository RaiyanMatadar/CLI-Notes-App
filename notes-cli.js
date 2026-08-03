const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const configPath = path.join(__dirname, 'notes.json');

// for adding note commands
const command = process.argv[2]; // e.g "add"
const noteText = process.argv[3]; // e.g "Buy groceries"
const createdAt = new Date();

// if the command is "node notes-cli.js add" then the below will run
if (command === "add") {

  // validation condition if the noteText isnt provided then it will trow error
  if (noteText == undefined) {
    console.log("please enter note");
    return;
  }

  // this notes obj will hold data of single note everytime i run 
  // - node notes-cli.js add "show"
  const notes = {
    id: crypto.randomUUID(),
    noteText: noteText,
    createdAt: createdAt
  }

  // everytime i make new note, it will pushed to existingNotes array
  let existingNotes = []
  existingNotes.push(notes)


  try {
    // if file `notes.json` exist then add data else make the `notes.json` file  
    if (fs.existsSync(configPath)) {

      // read the whole file and add that data into `data` param
      fs.readFile(configPath, "utf-8", (error, data) => {
        if (error) return console.log(error);

        // this will parse the new data to the `notes.json` file 
        if (data.length > 0) {
          existingNotes = JSON.parse(data);
          existingNotes.push(notes);
        }


        fs.writeFile(configPath, JSON.stringify(existingNotes, null, 2), (error) => {
          if (error) return
        })
      })


    } else {
      fs.writeFile(configPath, JSON.stringify([notes]), (error) => {
        if (error) return console.log(error);
      })
    }

  } catch (error) {
    console.log("this is catch error ", error);
  }

}

if (command === "list") {
  fs.readFile(configPath, (error, data) => {
    if (error) return console.error(error)

    const notesList = JSON.parse(data);
    notesList.forEach((note, index) => {
      console.log(`Note ${index + 1}`);
      console.log(`   ${note.noteText}`);
      console.log(`   ${new Date(note.createdAt).toLocaleString()}`);
      console.log("----------------------------------");
    });

  })
}

if (command === "remove") {
  // validation condition if the noteText isnt provided then it will trow error
  if (noteText == undefined) {
    console.log("please enter id number");
    return;
  }

  // read the file and get the data 
  fs.readFile(configPath, (error, data) => {

    // converting string data into object
    const notesList = JSON.parse(data)

    // removing specific data using index of it  e.g - "node notes-cli.js remove 1"
    const removedNote = notesList.filter((note, index) => index != (noteText - 1))

    // overridning the data which we got from removedNote and adding it to the `notes.json` file    
    fs.writeFile(configPath, JSON.stringify(removedNote), (error) => {
      if (error) return
    })
  })
}