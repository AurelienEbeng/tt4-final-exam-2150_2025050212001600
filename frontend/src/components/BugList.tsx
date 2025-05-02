import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import httpModule from '../helper/http.module';
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Box, Button, CircularProgress } from '@mui/material';

type Bug ={
    id: string,
    title: string,
    description: string,
    priority:string,
    isResolved: string
}

const BugList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [bugs, setBugs] = useState<Bug[]>([]);
    useEffect(() => {
        setLoading(true);
        httpModule
          .get<Bug[]>("/list")
          .then((response) => {
            setBugs(response.data);
            setLoading(false);
          })
          .catch((error) => {
            alert("Error");
            console.log(error.response);
            setLoading(false);
          });
      }, []);

      function deleteBug(bugId:string){
        let params = new URLSearchParams();
        params.append("bugId", bugId);
        httpModule
          .delete("delete?"+params)
          .then(() => {})
          .catch((error) => {
            alert("Error, check console");
            console.log(error.response);
          });
      }

      const column: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "title", headerName: "Title", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "priority", headerName: "Priority", flex: 1 },
        { field: "isResolved", headerName: "Is Resolved", flex: 1 },
        {
            field: "",
            flex: 1,
            renderCell: (params) => {
              return (
                <Link
                to = "/update"
                state={{
                    bug: {
                        id: `${params.row.id}`,
                        title: `${params.row.title}`,
                        description: `${params.row.description}`,
                        priority: `${params.row.priority}`,
                        isResolved: `${params.row.isResolved}`,
                      },
                }}
                 />
              )}},
        {
          field: "",
          flex: 1,
          renderCell: (params) => {
            return (
              <Button variant="outlined" onClick={()=> deleteBug(params.row.id)}>Delete</Button>
            )}}
      ];

  return (
    <>
        <h2>List Sessions</h2>
        <Button onClick={() => navigate("/create")}>Create</Button>
        {loading ? (
        <CircularProgress size={100} />
      ) : (
        <Box sx={{ width: "100%", height: 350 }} className="bugs-grid">
          <DataGrid
            rows={bugs}
            columns={column}
            getRowId={(row) => row.id}
            getRowHeight={() => "auto"}
            sx={{
              [`& .${gridClasses.cell}`]: {
                py: 2,
              },
            }}
          />
        </Box>
      )}
    </>
  )
}

export default BugList