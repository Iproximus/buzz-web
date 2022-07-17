import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, Box } from '@material-ui/core';
import GeoLocation from "../GeoLocation";


function EditPropertyDetails({ register, errors, shouldDisplay, func, data }) {
    const [country, setCountry] = useState("6252001");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [streetnumber, setStreetnumber] = useState('');
    const [streetname, setStreetname] = useState('');
    const [zipcode, setZipcode] = useState('');

    const stnumber = { ...register('streetnumber', { required: true, maxLength: 5, min: 1 }) }
    const stname = { ...register('streetname', { required: true, maxLength: 50, pattern: /^[A-Za-z' ']+$/i }) }
    const zip = { ...register('zipcode', { required: true, maxLength: 5, minLength: 5, min: 1 }) }
    
    useEffect(() => {
        setStreetnumber(data.streetnumber);
        setStreetname(data.streetname);
        setZipcode(data.zipcode);
    }, [data.streetnumber], [data.streetname], [data.zipcode]);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    return (
        <div style={{ display: shouldDisplay ? "block" : "none" }}>
            <form autoComplete="on">
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" >
                    <Box className="property-form" gridColumn="span 2">
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{ display: 'none' }}
                            onChange={e => setSelectedImage(e.target.files[0])}
                        />
                        <label htmlFor="select-image">
                            <Button style={{ marginTop: "5px" }} variant="contained" color="primary" component="span">
                                Upload Image
                            </Button>
                        </label>
                    </Box>

                    <Box gridColumn="span 2">
                            {imageUrl && selectedImage && (
                                <img src={imageUrl} alt={selectedImage.name} style={{
                                    alignItems: 'center',
                                    width: "90px",
                                    marginLeft:"10px",
                                    marginTop:"10px",
                                    borderRadius: 3
                                }} />
                            )}
                    </Box>

                    <Box className="property-form" gridColumn="span 4">
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Street Number"
                            value={streetnumber}
                            {...stnumber}
                            onChange={e => { stnumber.onChange(e); setStreetnumber(e.target.value) }}
                        />
                        {errors?.streetnumber?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.streetnumber?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-99999 only</p>)}
                        {errors?.streetnumber?.type === "min" && <p style={{ color: "red" }}>Negative digits not allowed</p>}
                    </Box>

                    <Box className="property-form" gridColumn="span 4">
                        <TextField
                            required
                            type="text"
                            variant="outlined"
                            label="Street Name"
                            value={streetname}
                            {...stname}
                            onChange={e => { stname.onChange(e); setStreetname(e.target.value) }}
                        />
                        {errors?.streetname?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                        {errors?.streetname?.type === "pattern" && (<p style={{ color: "red" }}>Alphabetical characters only</p>)}
                        {errors?.streetname?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 50 char only</p>)}
                    </Box>

                    <Box className="property-form" gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <GeoLocation sx={{ minWidth: 200 }}
                                locationTitle="Select State"
                                onChange={setState}
                                geoId={country} />
                        </FormControl>
                    </Box>

                    <Box className="property-form" gridColumn="span 4">
                        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                            <GeoLocation sx={{ minWidth: 200 }}
                                locationTitle="Select City"
                                onChange={setCity}
                                geoId={state} />
                        </FormControl>
                    </Box>
                    {func(country, state, city)}

                    <Box className="property-form" gridColumn="span 4">
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Zip Code"
                            value={zipcode}
                            {...zip}
                            onChange={e => { zip.onChange(e); setZipcode(e.target.value) }}
                        />
                        {errors?.zipcode?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.zipcode?.type === "maxLength" && (<p style={{ color: "red" }}>Enter 5 digits only </p>)}
                        {errors?.zipcode?.type === "minLength" && (<p style={{ color: "red" }}>Need 5 digits</p>)}
                        {errors?.zipcode?.type === "min" && (<p style={{ color: "red" }}>Negative digits not allowed</p>)}
                    </Box>
                </Box>
            </form>
        </div >
    );
}

export default EditPropertyDetails;
