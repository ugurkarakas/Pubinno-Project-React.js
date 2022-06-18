import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import '../atom-modal/atomModal.scss';

export default function FormModal({open,handleClose,maxWidth,data,onChange,handleFormSubmit}) {
 const{id,name,address,openTime,closeTime}= data

  return (
    <div> 
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle class="modal-head" id="alert-dialog-title">
         <h3>{id?"Update Location":"Add New Location"}</h3>              
         <i onClick={handleClose} class="fa-solid fa-xmark"></i>
        </DialogTitle>
        <DialogContent>
          <form class="form-content">
             <div class="form-head">
             <h2>GENERAL</h2>
             </div>
             <div class="form-content">
              <input id="name" value={name} onChange={e=>onChange(e)} placeholder="Name" label="Name" />
              <input id="address" value={address} onChange={e=>onChange(e)} placeholder="Address" label="Address" />
              <input id="openTime" value={openTime} onChange={e=>onChange(e)} placeholder="Opening Time" label="Date" type="time" min="09:00" max="18:00"/>
              <input id="closeTime" value={closeTime} onChange={e=>onChange(e)} placeholder="Closing Time Date" label="Date" type="time" min="09:00" max="18:00"/>

             </div>
          </form>
        </DialogContent>
        <DialogActions class="form-footer">
          <button class="saveButton" onClick={()=>handleFormSubmit()}>
            {id?"Update":"Save"}</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
