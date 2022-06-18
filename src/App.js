import logo from './logo.svg';
import './App.scss';
import MoleculeNavigation from "./ui-kits/molecule/molecule-navigationbar/moleculeNavigation";
import MoleculeHeader from "./ui-kits/molecule/molecule-header/moleculeHeader";
import MoleculeSidebar from "./ui-kits/molecule/molecule-sidebar/moleculeSidebar";
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'; 
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; 
import FormModal from './ui-kits/atoms/atom-modal/atomModal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
const initialValue = {name:"",address:"",openTime:"",closeTime:""}
const url='http://localhost:4000/locations'
function App() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [searchTerm, setSearchTerm] = useState();
  const OpenModal = () => {
    setOpen(true);
  };

  const CloseModal = () => {
    setOpen(false);
    setFormData(initialValue)
  };

   const [gridApi, setGridApi] = useState(null)
   const [tableData, setTableData] = useState(null)
   const columns=[
    {title:"ID",field:"id"},
    {title:"NAME",field:"name"},
    {title:"ADDRESS",field:"address"},
    {title:"OPENING TIME",field:"openTime"},
    {title:"CLOSING TIME",field:"closeTime"},
   ]
    const columnDefs = [
      {headerName:"ID",field:"id"},
      {headerName:"NAME",field:"name"},
      {headerName:"ADDRESS",field:"address"},
      {headerName:"OPENING TIME",field:"openTime"},
      {headerName:"CLOSING TIME",field:"closeTime"},
      {headerName:"ACTIONS",field:"id", cellRendererFramework:(params)=>
      <div>
        <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
      <React.Fragment>
          <i class="fa-solid fa-ellipsis-vertical action" {...bindTrigger(popupState)}></i>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={()=>handleUpdate(params.data)}>Update</MenuItem>
            <MenuItem onClick={()=>handleDelete(params.value)}>Delete</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
      </div>
    },
    ]
    useEffect(()=> {
      getUsers()
    },[])
    const getUsers=() =>{
      fetch(url).then(resp =>resp.json()).then(resp =>setTableData(resp))
    }

    const onChange=(e)=>{
      const {value,id}=e.target
      setFormData({...formData,[id]:value})
    }
    const handleFormSubmit = () =>{
      if(formData.id){
        fetch(url+'/'+ (formData.id),{
          method:'PUT',body:JSON.stringify(formData),  
          headers:{'content-type':'application/json'}
        }).then(resp => resp.json()).then(resp =>{
          CloseModal()
          getUsers()
        })
      }
      else{
        fetch(url,{method:'POST',body:JSON.stringify(formData),
        headers:{'content-type':"application/json"}}).then(resp=>resp.json())
        .then(resp => {
          getUsers()
          CloseModal()
        })
      }
    }
    const handleDelete = (id)=>{
      fetch(url+'/'+(id),{method:'DELETE'}).then(resp=>resp.json()).then(resp=>getUsers())
    }
    const handleUpdate = (oldData) =>{
      setFormData(oldData)
      OpenModal()
    }
    const onGridReady = (params) =>{
      setGridApi(params)
    }
    const defaultColDef = {
      sortable:true,
      flex:1, 
      filter:true,
      floatingFilter:true
    }
  return (
    <div className='App'>
       <MoleculeHeader/>
       <FormModal open={open} handleClose={CloseModal} data={formData} 
       onChange={onChange} handleFormSubmit={handleFormSubmit}/>
       <div class="main">
        <MoleculeSidebar class="sidebar"/>
        <div class="content">
          <MoleculeNavigation/>
          <div class="content-head-partial">
            <h1>Locations</h1>
            <div class="process-partial">
            <input type="text" placeholder='Search' onChange={event => {setSearchTerm(event.target.value)}}/>
            <button onClick={OpenModal}><i class="fa-solid fa-plus"></i> New</button>
            </div>
          </div>
          <div>

          </div>
        <div className='ag-theme-alpine' style={{height:'680px'}}>
      <AgGridReact 
rowData={tableData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onGridReady={onGridReady}/>
      </div>
        </div>
       </div>
    </div>
  );
}

export default App;
