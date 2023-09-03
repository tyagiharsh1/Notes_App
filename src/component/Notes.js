import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/users/noteContext'
import Noteitem from './Noteitem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';
export const Notes = (props) => {
  let history=useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
    }
    else
    {
      console.log("Navigating to login page");
      history("/login");
      console.log("Navigation complete");
    }
    
  }, [getNotes,history]);
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    // setNote(currentNote);
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    
  }
  const handleClick = (e) => {
    // editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    console.log("Updating the notes....", note)
    // e.preventDefault();
    props.showAlert("Updated Successfully","success");
    editNote(note.id, note.etitle, note.edescription, note.etag)
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>


      <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                  </div>
                  <div className="mb-3">
                    <label for="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                  </div>
                  <div className="mb-3">
                    <label for="etag" className="form-label">Tag</label>
                    <input type="etext" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                  </div>

                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" class="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>

        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  )
}
