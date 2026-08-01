const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, 'notes.json');

// for adding note commands
const command = process.argv[2]; // e.g "add"

let id = 0;
const noteText = process.argv[3]; // e.g "Buy groceries"
const createdAt = new Date();

// this notes obj will hold data of single note everytime i run 
// - node notes-cli.js add "show"
const notes = {
  id: id,
  noteText: noteText,
  createdAt: createdAt
}


// if the command is "node notes-cli.js add" then the below will run
if (command === "add") {

  // validation condition if the noteText isnt provided then it will trow error
  if (noteText == undefined) {
    console.log("please enter note");
    return;
  }

  try {
    // if file `notes.json` exist then add data else make the `notes.json` file  
    if (fs.existsSync(configPath)) {

      // read the whole file and add that data into `data` param
      fs.readFile(configPath, (error, data) => {
        if (error) return console.log(error);

        // everytime i make new note, it will pushed to existingNotes array
        let existingNotes = []
        existingNotes.push(notes)
        
      
        // if `notes.json` has data then we will send notes.json 
        // data into existingNotes variable as an object 
        if (data.length > 0) {
          existingNotes.push(JSON.parse(data))
          console.log(existingNotes);
        }
        

        fs.writeFile(configPath, JSON.stringify(existingNotes, null, 2), (error) => {
          if (error) return

          
        })
      })


    } else {
      fs.writeFile(configPath, JSON.stringify(notes), (error) => {
        if (error) return console.log(error);
      })
    }

  } catch (error) {
    console.log("this is catch error ", error);
  }

}
