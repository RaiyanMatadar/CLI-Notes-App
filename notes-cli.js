// CLI notes that stores data into notes.json using file system

// Add a note
// node notes-cli.js add "Buy groceries"

// If notes.json doesn't exist yet, create it (writeFile)
// If it exists, read it, parse the JSON, push the new note, write it back
// Each note should have an id, text, and createdAt

const fs = require("fs");
const path = require("path");

// importing readline for taking input from user in terminal
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// for adding note commands
const command = process.argv[2]; // e.g "add"
const noteText = process.argv[3]; // e.g "Buy groceries"

const data = {
  text: "hello world",
};

// if the command is "node notes-cli.js" then the below will run
if (command === "add") {
  
  // here the noteText in the param will have the data which is passed by user
  // and below we are using that data to add it in the notes.json file
  rl.question("enter note text : ", (noteText) => {
    data.text = noteText;

    // adding data.text into notes.json file
    fs.writeFile("notes.json", JSON.stringify(data), (error) => {
      if (error) return;
    });

    rl.close();
  });
}
