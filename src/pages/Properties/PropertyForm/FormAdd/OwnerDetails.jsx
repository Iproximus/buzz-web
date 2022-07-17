import React from "react";
import { TextField,  Box } from '@material-ui/core';

function OwnerDetails({ register, errors, shouldDisplay }) {
    
  return (
    <div style={{ display: shouldDisplay ? "block" : "none" }}>
      <form autoComplete="on">
        
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
                <Box className="property-form-owner" gridColumn="span 4">
                    <TextField
                    required
                        type="text"
                        variant="outlined"
                        label="First Name"
                        placeholder="Enter First Name"
                        {...register('firstname', {
                            required: true,
                            maxLength: 20,
                            pattern: /^[A-Za-z ' ' ]+$/i
                        })}
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
                        placeholder="Enter Last Name"
                        {...register('lastname', { required: true, maxLength: 20, pattern: /^[A-Za-z ' ' ]+$/i })}
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
                        placeholder="Enter Phone Number"
                        {...register('phone', { required: true, maxLength: 10, minLength: 10 })}
                    />
                    {errors?.phone?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                    {errors?.phone?.type === "maxLength" && (<p style={{ color: "red" }}>Enter 10 digits only </p>)}
                    {errors?.phone?.type === "minLength" && (<p style={{ color: "red" }}>Need 10 digits</p>)}
                </Box>

                <Box className="property-form-owner" gridColumn="span 6">
                    <TextField fullWidth
                    required
                        type="text"
                        variant="outlined"
                        label="Email"
                        placeholder="Enter Email"
                        {...register('email', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                    />
                    {errors?.email?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                    {errors?.email?.type === "pattern" && (<p style={{ color: "red" }}>invalid email</p>)}
                </Box>
            </Box>
      </form>
    </div>
  );
}

export default OwnerDetails;
