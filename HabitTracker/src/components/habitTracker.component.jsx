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
import HabitBox from './habitBox.component';
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


function HabitTracker() {
    const navigate = useNavigate();
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [userData, setUserData] = useState({
        userID: "", 
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
                <h3>Welcome user {userData.userID}</h3>
                <br/>
                <h1>{userData.username}'s Habit Tracker</h1>
                <br/>

                <Button onClick={handleOpen}>New Habit</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CreateHabit user={userData} />
                    </Box>
                </Modal>
                <HabitBox habit={'Read Before Bed'}/>
                <HabitBox habit={'100 Days of Code'}/>
                <HabitBox habit={'Run 5km'}/>
            </div>
        </>
    )

}

export default HabitTracker