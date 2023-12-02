import React from 'react'
import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import '../App.css';

//define the box style
const boxStyle = {
    transform: 'translate(12.5%, 50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 5,
    p: 4,
};


function HabitBox(habitName) {
    const navigate = useNavigate();
    console.log(habitName);

    return (
        <>      
            <Box sx={boxStyle}>
                <h3>{habitName.habit}</h3>
                <button>Completed</button>
                <button>View</button>
                <button>Failed</button>
            </Box>
        </>
    )

}

export default HabitBox