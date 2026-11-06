const express = require("express");
const { noteModel } = require("../model/note.model");

const noteRouter = express.Router();

// CREATE NOTE
noteRouter.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new noteModel({
      title,
      content,
      userId: req.user.userId
    });

    await note.save();
    res.status(201).send({ msg: "Note Created", note });
  } catch (error) {
    res.status(500).send({ msg: "Error creating note" });
  }
});

// READ ALL NOTES
noteRouter.get("/", async (req, res) => {
  try {
    const notes = await noteModel.find({
      userId: req.user.userId
    });

    res.send(notes);
  } catch (error) {
    res.status(500).send({ msg: "Error fetching notes" });
  }
});

// READ SINGLE NOTE
noteRouter.get("/:id", async (req, res) => {
  try {
    const note = await noteModel.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!note) {
      return res.status(404).send({ msg: "Note not found" });
    }

    res.send(note);
  } catch (error) {
    res.status(500).send({ msg: "Error fetching note" });
  }
});

// UPDATE NOTE
noteRouter.put("/update/:id", async (req, res) => {
  try {
    const note = await noteModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).send({ msg: "Note not found" });
    }

    res.send({ msg: "Note Updated", note });
  } catch (error) {
    res.status(500).send({ msg: "Error updating note" });
  }
});

// DELETE NOTE
noteRouter.delete("/delete/:id", async (req, res) => {
  try {
    const note = await noteModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!note) {
      return res.status(404).send({ msg: "Note not found" });
    }

    res.send({ msg: "Note Deleted" });
  } catch (error) {
    res.status(500).send({ msg: "Error deleting note" });
  }
});

module.exports = { noteRouter };