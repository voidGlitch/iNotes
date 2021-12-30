import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Add your notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descritpion" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
