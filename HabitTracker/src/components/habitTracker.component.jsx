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
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

//define the modal style
const style2 = {
    transform: 'translate(12.5%, 50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 5,
    p: 4,
};


function HabitTracker() {
    const navigate = useNavigate();
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [userData, setUserData] = useState({
        _id: "", 
        username: "", 
        password: "", 
        email: "", 
        firstname: "", 
        lastname: ""
    });

    useEffect(() => {
        const loggedInUser = document.cookie.split('=')[1];
        console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User is logged in");
            decodeJWT(loggedInUser);
        } else {
            console.log("No user is logged in");
            navigate("/login");
        }
        console.log(loggedInUser);
    }, []);

    const decodeJWT = async (token) => {
        console.log("token: ", token)
        const tokenData = await fetch('http://localhost:3001/decodeJWT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Token: token
        })
        })
        .then(res => res.json());

        console.log("token data -->", tokenData);
        setUserData(tokenData);
    }

    return (
        <>
            <div id='bodyTest' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
                <h2>{userData.username}'s Habit Tracker</h2>

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
                
                <Box sx={style2}>
                    <h3>Read before bed</h3>
                    <button>Completed</button>
                    <button>View</button>
                    <button>Failed</button>
                </Box>
                <Box sx={style2}>
                    <h3>Go for a run</h3>
                    <button>Completed</button>
                    <button>View</button>
                    <button>Failed</button>
                </Box>
                <Box sx={style2}>
                    <h3>Study for 1 hour or more</h3>
                    <button>Completed</button>
                    <button>View</button>
                    <button>Failed</button>
                </Box>
            </div>
        </>
    )

}

export default HabitTracker