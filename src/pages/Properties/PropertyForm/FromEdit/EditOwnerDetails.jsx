import React, { useState, useEffect } from "react";
import { TextField, Box } from '@material-ui/core';

function EditOwnerDetails({ register, errors, shouldDisplay, data }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const fname = { ...register('firstname', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i }) }
    const lname = { ...register('lastname', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i }) }
    const ph = { ...register('phone', { required: true, maxLength: 10, minLength: 10 }) }
    const mail = {
        ...register('email', {
            required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        })
    }
    useEffect(() => {
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setPhone(data.phone);
        setEmail(data.email);
    }, [data.firstname, data.lastname, data.phone, data.email]);

    return (
        <div style={{ display: shouldDisplay ? "block" : "none" }}>
            <form autoComplete="on">
                <br />
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
                    <Box className="property-form-owner" gridColumn="span 4">
                        <TextField
                        required
                            type="text"
                            variant="outlined"
                            label="First Name"
                            value={firstname}
                            {...fname}
                            onChange={e => { fname.onChange(e); setFirstname(e.target.value) }}
                        />
                        {errors?.firstname?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                        {errors?.firstname?.type === "pattern" && (<p style={{ color: "red" }}>Alphabetical characters only</p>)}
                        {errors?.firstname?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 20 char only</p>)}
                    </Box>

                    <Box className="property-form-owner" gridColumn="span 4">
                        <TextField
                        required
                            type="text"
                            variant="outlined"
                            label="Last Name"
                            value={lastname}
                            {...lname}
                            onChange={e => {lname.onChange(e); setLastname(e.target.value)}}
                        />
                        {errors?.lastname?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                        {errors?.lastname?.type === "pattern" && (<p style={{ color: "red" }}>Alphabetical characters only</p>)}
                        {errors?.lastname?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 20 char only</p>)}
                    </Box>

                    <Box className="property-form-owner" gridColumn="span 4">
                        <TextField
                        required
                            type="number"
                            variant="outlined"
                            label="Phone"
                            value={phone}
                            {...ph}
                            onChange={e => {ph.onChange(e); setPhone(e.target.value)}}

                        />
                        {errors?.phone?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.phone?.type === "maxLength" && (<p style={{ color: "red" }}>Enter 10 digits only </p>)}
                        {errors?.phone?.type === "minLength" && (<p style={{ color: "red" }}>Need 10 digits</p>)}
                    </Box>

                    <Box className="property-form-owner" gridColumn="span 6">
                        <TextField
                        required
                            type="text"
                            variant="outlined"
                            label="Email"
                            value={email}
                            {...mail}
                            onChange={e => {mail.onChange(e); setEmail(e.target.value)}}
                            

                        />
                        {errors?.email?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                        {errors?.email?.type === "pattern" && (<p style={{ color: "red" }}>invalid email</p>)}
                    </Box>
                </Box>
            </form>
        </div>
    );
}

export default EditOwnerDetails;
