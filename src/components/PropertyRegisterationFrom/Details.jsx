import React from "react";

import { Select, Item, Paper, Box, styled, InputLabel, FormControl, FormGroup, MenuItem, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { States } from './us-state'

const Details = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = React.useState(null)
    const onSubmit = data => console.log(data);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 2">
                        <Button variant="contained" component="label" >
                            Upload File
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                id="contained-button-file"
                                {...register("uploadimg")}
                                onChange={onImageChange}
                            />
                        </Button>
                    </Box>

                    <Box gridColumn="span 2">
                        <div style={{ width: "50px", borderRadius: 3 }}>
                            {image && (
                                <img
                                    style={{
                                        alignItems: 'center',
                                        width: "50px",
                                        borderRadius: 3,
                                    }}
                                    src={image}
                                    alt="landimage"
                                />
                            )}
                        </div>
                    </Box>

                    <Box gridColumn="span 4">
                        <TextField
                            type="number"
                            variant="outlined"
                            label="Street number"
                            {...register('streetnumber', { required: true, maxLength: 5 })}
                        />
                        {errors?.streetnumber?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.streetnumber?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-99999 only</p>)}
                    </Box>

                    <Box gridColumn="span 4">
                        <TextField
                            type="text"
                            variant="outlined"
                            label="Street name"
                            placeholder="Enter your street name"
                            {...register('streetname', {
                                required: true,
                                maxLength: 50,
                                pattern: /^[A-Za-z]+$/i
                            })}
                        />
                        {errors?.streetname?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                        {errors?.streetname?.type === "pattern" && (<p style={{ color: "red" }}>Alphabetical characters only</p>)}
                        {errors?.streetname?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 50 char only</p>)}
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="state-select-standard-label">Select state</InputLabel>
                            <Select
                                label="Select state"
                                {...register("states", { required: true, })}
                            >
                                {States.states && States.states.map((e, key) => {
                                    return <MenuItem key={key} value={e.key}>
                                        {e.code} : {e.value}
                                    </MenuItem>;
                                })}
                            </Select>
                            {errors?.states?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="state-select-standard-label">Select citys</InputLabel>
                            <Select

                                label="Select citys"
                                {...register("citys", { required: true, })}
                            >
                                <MenuItem value={1}>Texas</MenuItem>
                                <MenuItem value={2}>Los Angeles</MenuItem>
                                <MenuItem value={3}>Chicago</MenuItem>
                            </Select>
                            {errors?.citys?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                        </FormControl>
                    </Box>


                    <Box gridColumn="span 4">
                        <TextField
                            type="number"
                            variant="outlined"
                            label="Zip code"
                            {...register('zipcode', { required: true, maxLength: 5 })}
                        />
                        {errors?.zipcode?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.zipcode?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-99999 only</p>)}
                    </Box>

                    <Box gridColumn="span 8">
                        <Button variant="contained" type="submit">
                            Next
                        </Button>
                    </Box>

                </Box>
            </form>
        </div>
    );

};
export default Details;
