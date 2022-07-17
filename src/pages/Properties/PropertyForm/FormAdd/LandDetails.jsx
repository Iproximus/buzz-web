import React from "react";
import { Select, Box, InputLabel, FormControl, OutlinedInput, InputAdornment, RadioGroup, FormControlLabel,
     Radio, FormLabel, MenuItem, TextField} from '@mui/material';

function LandDetails({ register, errors, shouldDisplay }) {

    let years = [];
    let bed = [];
    let bath = [];
     for (let i = 1950; i < 2023; i++) { years.push(i); } 
     for (let i = 1; i < 11; i++) { bed.push(i); } 
     for (let i = 1; i < 11; i++) { bath.push(i); } 
    return (
        <div style={{ display: shouldDisplay ? "block" : "none" }}>
            <form autoComplete="on">
                <br />
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>

                    <Box gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="state-select-standard-label" required>Select Year</InputLabel>
                            <Select

                                labelid="state-select-standard-label"
                                id="state-select-standard"
                                label="Select Year"
                                {...register('yearbuilt', { required: true, })}
                                defaultValue=""
                            >
                                {years.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                            </Select>
                            {errors?.yearbuilt?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Area (sq ft)"
                            {...register('area', { required: true, maxLength: 5, min: 1 })}
                        />
                        {errors?.area?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.area?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-99999 only</p>)}
                        {errors?.area?.type === "min" && (<p style={{ color: "red" }}>Negative digits not allowed</p>)}
                    </Box>

                    <Box gridColumn="span 4">
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Lot Area (sq ft)"
                            {...register('lotarea', { required: true, maxLength: 6, min: 1 })}
                        />
                        {errors?.lotarea?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.lotarea?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-999999 only</p>)}
                        {errors?.lotarea?.type === "min" && (<p style={{ color: "red" }}>Negative digits not allowed</p>)}
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="state-select-standard-label" required>Select Bedrooms</InputLabel>
                            <Select
                                label="Select Bedrooms"
                                {...register('bedrooms', { required: true, })}
                                defaultValue=""
                            >
                                {bed.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                            </Select>
                            {errors?.bedrooms?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="state-select-standard-label" required>Select Bathrooms</InputLabel>
                            <Select

                                label="Select Bathrooms"
                                {...register('bathrooms', { required: true, })}
                                defaultValue=""
                            >
                                {bath.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                            </Select>
                            {errors?.bathrooms?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="state-select-standard-label" required>Select Storey</InputLabel>
                            <Select

                                label="Select Storey"
                                {...register('storey', { required: true, })}
                            >
                                <MenuItem defaultValue={' '}>Select</MenuItem>
                                <MenuItem value={'1'}>1</MenuItem>
                                <MenuItem value={'2'}>2</MenuItem>
                            </Select>
                            {errors?.storey?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl>
                            <FormLabel required>Land Type</FormLabel>
                            <RadioGroup

                                {...register('landtype', { required: true, })}
                            >
                                <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
                                    <Box gridColumn="span 6">
                                        <FormControlLabel value='Owned' control={<Radio />} label="Owned" />
                                        <FormControlLabel value='Rented' control={<Radio />} label="Rented" />
                                    </Box>
                                </Box>
                            </RadioGroup>
                            {errors?.landtype?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <InputLabel id="state-select-standard-label" required>Select Type</InputLabel>
                            <Select

                                label="Select Type"
                                {...register('hometype', { required: true, })}
                            >
                                <MenuItem defaultValue={' '}>Select</MenuItem>
                                <MenuItem value={'Single family'}>Single Family</MenuItem>
                                <MenuItem value={'Town home'}>Town Home</MenuItem>
                                <MenuItem value={'Condo'}>Condo</MenuItem>
                            </Select>
                            {errors?.hometype?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl  >
                            <InputLabel htmlFor="outlined-adornment-amount" required>Home Value</InputLabel>
                            <OutlinedInput

                                type="number"
                                {...register('homevalue', { required: true, maxLength: 10, min: 1 })}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Home Value"
                            />
                            {errors?.homevalue?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                            {errors?.homevalue?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-999,999,999.99 only</p>)}
                            {errors?.homevalue?.type === "min" && (<p style={{ color: "red" }}>Negative digits not allowed</p>)}
                        </FormControl>
                    </Box>

                    <Box gridColumn="span 4">
                        <FormControl  >
                            <InputLabel htmlFor="outlined-adornment-amount" required>Tax Assessment</InputLabel>
                            <OutlinedInput

                                type="number"
                                {...register('taxassessment', { required: true, maxLength: 10, min: 1 })}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Tax Assessment"
                            />
                            {errors?.taxassessment?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
                            {errors?.taxassessment?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-999,999,999.99 only</p>)}
                            {errors?.taxassessment?.type === "min" && (<p style={{ color: "red" }}>Negative digits not allowed</p>)}
                        </FormControl>
                    </Box>

                </Box>
            </form>
        </div>
    );
}

export default LandDetails;
