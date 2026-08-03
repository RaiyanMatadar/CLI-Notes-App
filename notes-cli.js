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

  if (fs.existsSync(configPath)) {

    fs.readFile(configPath, (error, data) => {
      if (error) return console.error(error)

      const notesList = JSON.parse(data);

      // if the data is empty then user ont be able to see list 
      if (notesList.length == 0) {
        console.log("No data exist, Create notes for viewing");
        return
      }

      notesList.forEach((note, index) => {
        console.log(`Note ${index + 1}`);
        console.log(`   ${note.noteText}`);
        console.log(`   ${new Date(note.createdAt).toLocaleString()}`);
        console.log("----------------------------------");
      });
    })
  } else {
    console.log("No data exist, Create notes for viewing");
  }
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

if (command === "archive") {

  // it will make directory named `archive/` 
  fs.mkdir("archive/", { recursive: true }, (error) => {
    if (error) return

    fs.readFile("notes.json", (error, data) => {
      if (error) return

      // converting string data into object
      const notesList = JSON.parse(data)

      // making new files for each notes and passing data to each file 
      notesList.forEach((note, index) => {
        fs.writeFile(`archive/${index + 1}.json`, JSON.stringify(note), (error) => {
          if (error) return
        })
      })
      console.log("archived sucesfully");
    })
  })
}

if (command === "stats") {

  if (fs.existsSync(configPath)) {
    fs.stat(configPath, (error, stats) => {
      if (error) return console.log(error);

      const statDate = new Date(stats.birthtimeMs);
      console.log(`Size : ${stats.size}`);
      console.log(`Time : ${statDate}`);

    });
  } else {
    console.log("notes doesnt exist, add notes to view the internals");
  }
}

if (command === "clear") {
  fs.unlink(configPath, (error) => {
    if (error) return
  })

  fs.rm("archive", { recursive: true }, (error) => {
    if (error) {
      console.log("Error:", error);
      return;
    }
    console.log("Deleted!");
  });
}