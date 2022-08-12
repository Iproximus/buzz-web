import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, Box } from "@material-ui/core";
import GeoLocation from "../GeoLocation";
import "../../../../styles/style.css";

function Address({
  register,
  errors,
  shouldDisplay,
  func,
  passingImage,
  data,
}) {
  const country = "6252001";
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState("");
  const id = data && data.id ? data._id : undefined;
  const [streetnumber, setStreetnumber] = useState(id ? data.streetnumber : '');
  const [streetname, setStreetname] = useState(id ? data.streetname : '');
  const [zipcode, setZipcode] = useState(id ? data.zipcode : '');

  const stnumber = {
    ...register("streetnumber", { required: true, maxLength: 5, min: 1 }),
  };
  const stname = {
    ...register("streetname", {
      required: true,
      maxLength: 50,
      pattern: /^[A-Za-z' '0-9]+$/i,
    }),
  };
  const zip = {
    ...register("zipcode", {
      required: true,
      maxLength: 5,
      minLength: 5,
      min: 1,
    }),
  };

  useEffect(() => {
    setStreetnumber(data.streetnumber);
    setStreetname(data.streetname);
    setZipcode(data.zipcode);

    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage, data.streetname, data.streetnumber, data.zipcode]);

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setSelectedImage(e.target.files[0]);
    setFile(file);
  };

  return (
    <div style={{ display: shouldDisplay ? "block" : "none" }}>
      <form autoComplete="on">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridColumnGap={10}
          gridRowGap={10}
        >
          <Box gridColumn="span 4">
            <input
              accept="image/*"
              type="file"
              
              id="select-image"
              style={{ display: "none" }}
              onChange={fileSelected}
            />
            <label htmlFor="select-image">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="span"
              >
                Upload Image
              </Button>
            </label>
          </Box>

          <Box gridColumn="span 4">
            <TextField
              required
              type="number"
              value={streetnumber}
              variant="outlined"
              label="Street Number"
              {...stnumber}
              onChange={e => { stnumber.onChange(e); setStreetnumber(e.target.value) }}
            />
            {errors?.streetnumber?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.streetnumber?.type === "maxLength" && (
              <p style={{ color: "red" }}>You can enter 0-99999 only</p>
            )}
            {errors?.streetnumber?.type === "min" && (
              <p style={{ color: "red" }}>Negative digits not allowed</p>
            )}
          </Box>

          <Box gridColumn="span 4">
            <TextField
              required
              type="text"
              variant="outlined"
              value={streetname}
              label="Street Name"
              placeholder="Enter your street name"
              {...stname}
              onChange={(e) => {
                stname.onChange(e);
                setStreetname(e.target.value);
              }}
            />
            {errors?.streetname?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.streetname?.type === "pattern" && (
              <p style={{ color: "red" }}>Alphanumeric characters only</p>
            )}
            {errors?.streetname?.type === "maxLength" && (
              <p style={{ color: "red" }}>You can enter 50 char only</p>
            )}
          </Box>

          <Box gridColumn="span 4" gridRow="span 2">
            <Box gridColumn="span 4">
              {imageUrl && selectedImage && (
                <img
                  src={imageUrl}
                  alt={selectedImage.name}
                  style={{
                    alignItems: "center",
                    width: "208px",
                    height: "130px",
                    borderRadius: 3,
                  }}
                />
              )}
            </Box>
          </Box>
          {imageUrl && selectedImage && (passingImage(file))}

          <Box gridColumn="span 4">
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <GeoLocation
                sx={{ minWidth: 200 }}
                locationTitle="Select State"
                onChange={setState}
                geoId={country}
              />
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <GeoLocation
                sx={{ minWidth: 200 }}
                locationTitle="Select City"
                onChange={setCity}
                geoId={state}
              />
            </FormControl>
          </Box>
          {func(country, state, city)}

          <Box gridColumn="span 4">
            <TextField
              required
              type="number"
              value={zipcode}
              variant="outlined"
              label="Zip code"
              {...zip}
              onChange={e => { zip.onChange(e); setZipcode(e.target.value) }}
            />
            {errors?.zipcode?.type === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors?.zipcode?.type === "maxLength" && (
              <p style={{ color: "red" }}>Enter 5 digits only </p>
            )}
            {errors?.zipcode?.type === "minLength" && (
              <p style={{ color: "red" }}>Need 5 digits</p>
            )}
            {errors?.zipcode?.type === "min" && (
              <p style={{ color: "red" }}>Negative digits not allowed</p>
            )}
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Address;
