const fs = require("fs");
const path = require("path");

// for adding note commands
const command = process.argv[2]; // e.g "add"
const noteText = process.argv[3]; // e.g "Buy groceries"

// if the command is "node notes-cli.js" then the below will run
if (command === "add") {
  // validation condition if the noteText isnt provided then it will trow error
  if (noteText == undefined) {
    console.log("please enter note");
    return;
  }

  let data = [];

  // check if the notStrictEqual.json file exist
  if (fs.promises.access("notes.json")) {
    // then we are getting that data
    fs.readFile("notes.json", async (error, existingData) => {
      
      if (error) return;
      await data.push(existingData.toString())

      console.log("inside async");
      
    });
  }

  console.log("outside async");

  // here the noteText in the param will have the data which is passed by user
  // and below we are using that data to add it in the notes.json file
  let id = 0;
  const createdAt = new Date().toISOString();

  const note = {
    id: id,
    createdAt: createdAt,
    noteText: noteText,
  };

  data.push(note);

  // adding data.text into notes.json file
  fs.writeFile("notes.json", JSON.stringify(data), (error) => {
    if (error) return;
    
    console.log("note added succesfully");
  });

  // increment id by 1 for adding unique id everytime user enter note
  id++;
}
