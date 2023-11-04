import React from 'react'
import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import CreateHabit from "./createHabit.component";
import '../App.css';

//define the modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function HabitTracker() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const loggedInUser = document.cookie.split('=')[1];
        console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User is logged in");
            navigate("/Habits", {relative: "path"})
        } else {
            console.log("No user is logged in");
        }
        console.log(loggedInUser);
    }, []);

    return (
        <>
            <div id='bodyTest' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
                <h2>Habit Tracker</h2>

                <Button onClick={handleOpen}>New Habit</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CreateHabit />
                    </Box>
                </Modal>
                
            </div>
        </>
    )

}

export default HabitTracker