import Note from "../Models/note.js";
import mongoose from "mongoose";

export async function getAllNotes(_,res) { // Promises (async & await)
    try {
        const notes = await Note.find().sort({createdAt:-1}); // newOne On Top(desc)
        return res.status(200).json(notes);
    }
    catch(error) {
        console.error("Error in getAllNotes Controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getNoteById(req,res) { // Promises (async & await)
    try {
        const notes = await Note.findById(req.params.id);
        if(!notes) {
            return res.status(404).json({ message: "Note Not Found" });
        }
        res.status(200).json(notes);
    }
    catch(error) {
        console.error("Error in getNoteById Controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function createNote(req,res) {
    try {
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch(error) {
        console.error("Error in createNote Controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateNote(req,res){
    try {
        const {title,content} = req.body;
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({ message: "Invalid Note ID" });
            }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new : true,
            }
        );
        if(!updatedNote) {
            res.status(404).json({message:"Note Not Found"});
        }

        res.status(200).json(updatedNote);
    }
    catch(error) {
        console.error("Error in updateNote Controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteNote(req,res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            res.status(404).json({message:"Note Not Found"});
        }
        res.status(200).json({message:"Note deleted Successfully"});
    }
    catch(error) {
        console.error("Error in deleteNote Controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
    
}