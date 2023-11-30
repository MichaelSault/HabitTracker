import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';

function HabitTracker(userData) {
    console.log("userID ===============================>", userData.user.userID);
    const [habitDetails, setHabitDetails] = useState({
        userID: userData.user.userID,
        habitTitle: "",
        habitDescription: "",
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const handleChangeBool = (event) => {
        let {name, value} = event.target;
        
        console.log(habitDetails[name]);

        if(habitDetails[name] != true){
            value = true;
        } else {
            value = false;
        }

        console.log(name, ":", value);

        setHabitDetails(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const handleChange = (event) => {
        let {name, value} = event.target;

        console.log(name, ":", value);

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
                            name='habitDescription'
                            type='habitDescription'
                            value={habitDetails.habitDescription} 
                            placeholder='Describe your habit' 
                            onChange={handleChange}
                            className='mb-3'
                        />
                        </FloatingLabel>

                        <Form.Check
                            inline
                            label='S'
                            name='sunday'
                            type='checkbox'
                            value="true"
                            id='sunday'
                            onChange={handleChangeBool}
                        />
                        <Form.Check
                            inline
                            label='M'
                            name='monday'
                            type='checkbox'
                            id='monday'
                            onChange={handleChangeBool}
                        />
                        <Form.Check
                            inline
                            label='T'
                            name='tuesday'
                            type='checkbox'
                            id='tuesday'
                            onChange={handleChangeBool}
                        />
                        <Form.Check
                            inline
                            label='W'
                            name='wednesday'
                            type='checkbox'
                            id='wednesday'
                            onChange={handleChangeBool}
                        />
                        <Form.Check
                            inline
                            label='Th'
                            name='thursday'
                            type='checkbox'
                            id='thursday'
                            onChange={handleChangeBool}
                        />
                        <Form.Check
                            inline
                            label='F'
                            name='friday'
                            type='checkbox'
                            id='friday'
                            onChange={handleChangeBool}
                        />
                        <Form.Check
                            inline
                            label='S'
                            name='saturday'
                            type='checkbox'
                            id='saturday'
                            onChange={handleChangeBool}
                        />

                    </Form.Group>
                    <Button variant="outline-dark" style={{width:"100%", marginBottom:'1rem'}} onClick={handleClick}>Create</Button>
                </Form>
            </div>
        </>
    )

}

export default HabitTracker