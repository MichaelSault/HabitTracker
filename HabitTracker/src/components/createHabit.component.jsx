import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';

function HabitTracker() {
    const [habitDetails, setHabitDetails] = useState({
        habitTitle: "",
        habitDescription: ""
    });

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
            <h3>Add a New Habit</h3>
            <div id='bodyTest' style={{width:"97%", margin:"auto auto", textAlign:"center"}}>
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

                        <Form.Check
                            inline
                            label="S"
                            name="group1"
                            type='checkbox'
                            id={`sunday`}
                        />
                        <Form.Check
                            inline
                            label="M"
                            name="group1"
                            type='checkbox'
                            id={`monday`}
                        />
                        <Form.Check
                            inline
                            label="T"
                            name="group1"
                            type='checkbox'
                            id={`tuesday`}
                        />
                        <Form.Check
                            inline
                            label="W"
                            name="group1"
                            type='checkbox'
                            id={`wednesday`}
                        />
                        <Form.Check
                            inline
                            label="Th"
                            name="group1"
                            type='checkbox'
                            id={`thursday`}
                        />
                        <Form.Check
                            inline
                            label="F"
                            name="group1"
                            type='checkbox'
                            id={`friday`}
                        />
                        <Form.Check
                            inline
                            label="S"
                            name="group1"
                            type='checkbox'
                            id="saturday"
                        />

                    </Form.Group>
                    <Button variant="outline-dark" style={{width:"100%", marginBottom:'1rem'}} onClick={handleClick}>Create</Button>
                </Form>
            </div>
        </>
    )

}

export default HabitTracker