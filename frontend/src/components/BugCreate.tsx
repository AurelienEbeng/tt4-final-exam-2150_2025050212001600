import { Button, TextField } from '@mui/material';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpModule from '../helper/http.module';

const BugCreate = () => {
    const [bug, setBug] = useState({ ID:0, title: "", description:"", Priority:"HIGH",IsResolved: false  });
    
    const navigate = useNavigate();
  
    function handleSave() {
      if (bug.title == "") {
        alert("Some fields have not been filled");
        return;
      }
      httpModule
        .post("/create", bug)
        .then(() => navigate("/"))
        .catch((error) => {
          alert("Error, check console");
          console.log(error.response);
          console.log(bug)
        });
    }
    return (
      <div className='content'>
        <h2>New Bug</h2>
        <TextField
          autoComplete="off"
          label="Title"
          variant="outlined"
          value={bug.title}
          onChange={(e) => setBug({ ...bug, title: e.target.value })}
        />
        <TextField
          autoComplete="off"
          label="Description"
          variant="outlined"
          value={bug.description}
          onChange={(e) => setBug({ ...bug, description: e.target.value })}
        />
        
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </div>
    );
}

export default BugCreate