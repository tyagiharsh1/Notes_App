import React,{useContext,useState} from 'react'
import noteContext from '../context/users/noteContext'
export const AddNote = (props) => {
const context = useContext(noteContext);
const {addNote}=context;
 const [note, setNote] = useState({title:"",description:"",tag:""})
const handleClick=(e)=>
{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert("Note Added Successfully","success");
}
const onchange=(e)=>
{
    setNote({...note,[e.target.name]:e.target.value})
}

    return (
   
        <div className="container my-3">
            <h1>Add a Note</h1>
             <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"name='title' aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required />
                    
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onchange} value={note.description} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label for="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} value={note.tag} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
