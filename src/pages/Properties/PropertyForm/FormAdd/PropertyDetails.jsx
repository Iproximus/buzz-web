import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, Box } from '@material-ui/core';
import GeoLocation from "../GeoLocation";
import '../../../../styles/style.css'



function PropertyDetails({ register, errors, shouldDisplay, func }) {
    const [country, setCountry] = useState("6252001");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

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
                            <Button style={{ marginTop: "10px", width:'140px'}} variant="contained" color="primary" component="span">
                                Upload Image
                            </Button>
                        </label>
                    </Box>

                    <Box  gridColumn="span 2">
                        
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

                    <Box  className="property-form" gridColumn="span 4">
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            label="Street Number"
                            {...register('streetnumber', { required: true, maxLength: 5, min: 1 })}
                        />
                        {errors?.streetnumber?.type === "required" && <p style={{ color: "red" }}>This field is required</p>}
                        {errors?.streetnumber?.type === "maxLength" && (<p style={{ color: "red" }}>You can enter 0-99999 only</p>)}
                        {errors?.streetnumber?.type === "min" && <p style={{ color: "red" }}>Negative digits not allowed</p>}
                    </Box>


                    <Box className="property-form" gridColumn="span 4" >
                        <TextField
                            required
                            type="text"
                            variant="outlined"
                            label="Street Name"
                            placeholder="Enter your street name"
                            {...register('streetname', {
                                required: true,
                                maxLength: 50,
                                pattern: /^[A-Za-z0-9' ']+$/i
                            })}
                        />
                        {errors?.streetname?.type === "required" && (<p style={{ color: "red" }}>This field is required</p>)}
                        {errors?.streetname?.type === "pattern" && (<p style={{ color: "red" }}>Alphanumeric characters only</p>)}
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
                            label="Zip code"
                            {...register('zipcode', { required: true, maxLength: 5, minLength: 5, min: 1 })}
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

export default PropertyDetails;
