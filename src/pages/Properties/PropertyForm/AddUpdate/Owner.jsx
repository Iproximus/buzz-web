import React, { useState, useEffect } from "react";
import { TextField, Box } from "@material-ui/core";

function Owner({ register, errors, shouldDisplay ,data}) {
  const id = data && data.id ? data._id : undefined;
  const [firstname, setFirstname] = useState(id ? data.firstname : "");
  const [lastname, setLastname] = useState(id ? data.lastname : "");  
  const [phone, setPhone] = useState(id ? data.phone : "");
  const [email, setEmail] = useState(id ? data.email : "");

  const fname = { ...register("firstname", { required: true, maxLength: 20, pattern: /^[A-Za-z' ']+$/i, }), };
  const lname = { ...register("lastname", { required: true, maxLength: 20, pattern: /^[A-Za-z' ' ]+$/i, }), };
  const ph = { ...register("phone", { required: true, maxLength: 10, minLength: 10, pattern: /^[1-9][0-9]{9}$/, }), };
  const mail = { ...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, }), };

  useEffect(() => {
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setPhone(data.phone);
    setEmail(data.email);
  }, [data.firstname, data.lastname, data.phone, data.email]);

  return (
    <div style={{ display: shouldDisplay ? "block" : "none" }}>
      <form autoComplete="on">
        <Box display="grid" gridTemplateColumns="repeat(9, 1fr)"  gridColumnGap={10} gridRowGap={10}>
          <Box  gridColumn="span 6">
            <TextField
              required
              fullWidth
              type="text"
              value={firstname}
              variant="outlined"
              label="First Name"
              placeholder="Enter First Name"
              {...fname}
              onChange={(e) => {
                fname.onChange(e);
                setFirstname(e.target.value);
              }}
            />
            {errors?.firstname?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.firstname?.type === "pattern" && (
              <p style={{ color: "red" }}>Alphabetical characters only</p>
            )}
            {errors?.firstname?.type === "maxLength" && (
              <p style={{ color: "red" }}>You can enter 20 char only</p>
            )}
          </Box>

          <Box  gridColumn="span 3">
            <TextField
              required
              type="text"
              value={lastname}
              variant="outlined"
              label="Last Name"
              placeholder="Enter Last Name"
              {...lname}
              onChange={(e) => {
                lname.onChange(e);
                setLastname(e.target.value);
              }}
            />
            {errors?.lastname?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.lastname?.type === "pattern" && (
              <p style={{ color: "red" }}>Alphabetical characters only</p>
            )}
            {errors?.lastname?.type === "maxLength" && (
              <p style={{ color: "red" }}>You can enter 20 char only</p>
            )}
          </Box>

          <Box  gridColumn="span 9">
            <TextField
              required
              fullWidth
              value={phone}
              type="number"
              variant="outlined"
              label="Phone"
              placeholder="Enter Phone Number"
              {...ph}
              onChange={(e) => {
                ph.onChange(e);
                setPhone(e.target.value);
              }}
            />
            {errors?.phone?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.phone?.type === "pattern" && (
              <p style={{ color: "red" }}> "0" Not allowed at begin</p>
            )}
            {errors?.phone?.type === "maxLength" && (
              <p style={{ color: "red" }}>Enter 10 digits only </p>
            )}
            {errors?.phone?.type === "minLength" && (
              <p style={{ color: "red" }}>Need 10 digits</p>
            )}
          </Box>

          <Box  gridColumn="span 9">
            <TextField
              fullWidth
              required
              value={email}
              type="text"
              variant="outlined"
              label="Email"
              placeholder="Enter Email"
              {...mail}
              onChange={(e) => {
                mail.onChange(e);
                setEmail(e.target.value);
              }}
             
            />
            {errors?.email?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p style={{ color: "red" }}>invalid email</p>
            )}
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Owner;
