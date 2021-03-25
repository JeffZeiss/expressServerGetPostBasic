const e = require("express");
const express = require("express");
const app = express();
const notes = require("./data/notes-data");

app.use(express.json())

app.use((req,res,next)=>{
console.log("first app");
next();
})

app.use("/notes/:noteId", (req, res,next) => {
  const noteId = Number(req.params.noteId);
  console.log (noteId,typeof noteId,"noteId")
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote===undefined){

      next(`Note id not found: ${noteId}`)
    }
      else{
  res.json({ data: foundNote });}
});


app.get("/notes", (req, res) => {
  
  res.json({ data: notes });
});
// TODO: Add ability to create a new note

let lastNoteId = notes.reduce((maxId, note) => 
Math.max(maxId, note.id), 0);

app.post("/notes",(req,res,next)=>{
  console.log("in post at least")
  const {data:{text}={}} = req.body
  // const content = req.body
  console.log (text,"text")
  // const {data}=content
  // const {text} =data
  // console.log("content from body",content)
  // console.log(text,"text")
  if (text){
    const newNote={id: ++lastNoteId,
      text,
    }
    notes.push(newNote)
    res.status(201).json({data:newNote})
  }else{
    res.sendStatus(400)
  }
})
app.use((req,res,next)=>{
  console.log(req.orginalUrl,"url?")
  next(`Not found: ${req.originalUrl}`)
})


// TODO: add not found handler
app.use((error,req,res,next)=>{
  res.status(400).send(error)
})
// TODO: Add error handler

module.exports = app;
