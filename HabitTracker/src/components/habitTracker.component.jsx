import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';

function HabitTracker() {
    const [habitDetails, setHabitDetails] = useState({
        habitTitle: "",
        habitDescription: ""
    });

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

    const handleChange = (event) => {
        const {name, value} = event.target;

        setHabitDetails(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const handleClick = async (event) => {
        event.preventDefault();
        console.log(habitDetails);

        const habitData = await fetch('http://localhost:3001/createHabit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...habitDetails
            })
        })
        .then(res => res.json());
        console.log(habitData);
    }

    return (
        <>
            <div id='bodyTest' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
                <h2>Create A Habit</h2>
                
                <Form>
                    <Form.Group>
                        <FloatingLabel
                            controlId="habitTitle"
                            name="habitTitle"
                            label="Habit Title"
                            className="mb-3"
                        >
                        <Form.Control
                            name='habitTitle'
                            value={habitDetails.habitTitle} 
                            placeholder='Habit Title' 
                            style={{marginBottom: '1rem'}} 
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                        
                        <FloatingLabel
                            controlId="habitDescription"
                            name="habitDescription"
                            label="Description"
                            className="mb-3"
                        >
                        <Form.Control
                            name="habitDescription"
                            type='habitDescription'
                            value={habitDetails.habitDescription} 
                            placeholder='Describe your habit' 
                            onChange={handleChange}
                            className="mb-3"
                        />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="outline-dark" style={{width:"100%", marginBottom:'1rem'}} onClick={handleClick}>Login</Button>
                </Form>
            </div>
        </>
    )

}

export default HabitTracker