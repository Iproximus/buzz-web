import React, { useEffect, useState } from "react";
import { Select, Box, InputLabel, FormControl, OutlinedInput, InputAdornment, RadioGroup, FormControlLabel, Radio, FormLabel, MenuItem, TextField} from "@mui/material";

function Features({ register, errors, shouldDisplay, data }) {

  const id = data && data.id ? data._id : undefined;
  const [yearbuilt, setYearbuilt] = useState(id ? data.yearbuilt : "");
  const [area, setArea] = useState(id ? data.area : "");
  const [lotarea, setLotarea] = useState(id ? data.lotarea : "");
  const [bedrooms, setBedrooms] = useState(id ? data.bedrooms : "");
  const [bathrooms, setBathrooms] = useState(id ? data.bathrooms : "");
  const [storey, setStorey] = useState(id ? data.storey : "");
  const [ownership, setOwnership] = useState(id ? data.ownership : "");
  const [duestatus, setDuestatus] = useState(id ? data.duestatus : "");
  const [hometype, setHometype] = useState(id ? data.hometype : "");
  const [homevalue, setHomevalue] = useState(id ? data.homevalue : "");
  const [taxassessment, setTaxassessment] = useState(id ? data.taxassessment : "");

  const Yearbuilt = { ...register("yearbuilt", { required: true }) };
  const Area = { ...register("area", { required: true, maxLength: 5, min: 1 })}; 
  const Lotarea = { ...register("lotarea", { required: true, maxLength: 6, min: 1 })};
  const Bedrooms = { ...register("bedrooms", { required: true }) };
  const Bathrooms = { ...register("bathrooms", { required: true }) };
  const Storey = { ...register("storey", { required: true }) };
  const Ownership = { ...register("ownership", { required: true }) };
  const Duestatus = { ...register("duestatus", { required: true }) };
  const Hometype = { ...register("hometype", { required: true }) };
  const Homevalue = { ...register("homevalue", { required: true, maxLength: 10, min: 1 }) };
  const Taxassessment = { ...register("taxassessment", { required: true, maxLength: 10, min: 1 })};

  useEffect(() => {
    setYearbuilt(data.yearbuilt);
    setArea(data.area);
    setLotarea(data.lotarea);
    setBedrooms(data.bedrooms);
    setBathrooms(data.bathrooms);
    setStorey(data.storey);
    setOwnership(data.ownership);
    setDuestatus(data.duestatus);
    setHometype(data.hometype);
    setHomevalue(data.homevalue);
    setTaxassessment(data.taxassessment);
  }, [ data.yearbuilt, data.area, data.lotarea, data.bedrooms, data.bathrooms, data.storey, data.ownership, data.duestatus, data.hometype, data.homevalue, data.taxassessment]);


  let years = [];
  let bed = [];
  let bath = [];
  for (let i = 1950; i < 2023; i++) {
    years.push(i);
  }
  for (let i = 1; i < 11; i++) {
    bed.push(i);
  }
  for (let i = 1; i < 11; i++) {
    bath.push(i);
  }
  return (
    <div style={{ display: shouldDisplay ? "block" : "none" }}>
      <form autoComplete="on">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          rowGap={1}
          columnGap={1}
        >
          <Box gridColumn="span 4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-select-standard-label" required>
                Select Year
              </InputLabel>
              <Select
                labelid="state-select-standard-label"
                id="state-select-standard"
                label="Select Year"
                value={yearbuilt ?? ""}
                {...Yearbuilt}
                
                onChange={(e) => {
                  Yearbuilt.onChange(e);
                  setYearbuilt(e.target.value);
                }}
              >
                <MenuItem value = {yearbuilt}>Select</MenuItem>
                {years.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {errors?.yearbuilt?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <TextField
              fullWidth
              required
              value={area}
              type="number"
              variant="outlined"
              label="Area (sq ft)"
              {...Area}
              onChange={(e) => {
                Area.onChange(e);
                setArea(e.target.value);
              }}
            />
            {errors?.area?.type === "required" && (
              <p className="red-text">This field is required</p>
            )}
            {errors?.area?.type === "maxLength" && (
              <p className="red-text">You can enter 0-99999 only</p>
            )}
            {errors?.area?.type === "min" && (
              <p className="red-text">Negative digits not allowed</p>
            )}
          </Box>

          <Box gridColumn="span 4">
            <TextField
              required
              fullWidth
              value={lotarea}
              type="number"
              variant="outlined"
              label="Lot Area (sq ft)"
              {...Lotarea}
              onChange={(e) => {
                Lotarea.onChange(e);
                setLotarea(e.target.value);
              }}
            />
            {errors?.lotarea?.type === "required" && (
              <p className="red-text">This field is required</p>
            )}
            {errors?.lotarea?.type === "maxLength" && (
              <p className="red-text">You can enter 0-999999 only</p>
            )}
            {errors?.lotarea?.type === "min" && (
              <p className="red-text">Negative digits not allowed</p>
            )}
          </Box>

          <Box gridColumn="span 4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-select-standard-label" required>
                Select Bedrooms
              </InputLabel>
              <Select
                label="Select Bedrooms"
                
                value={bedrooms ?? ""}
                {...Bedrooms}
                onChange={(e) => {
                  Bedrooms.onChange(e);
                  setBedrooms(e.target.value);
                }}
              >
                <MenuItem value= {bedrooms}>Select</MenuItem>
                {bed.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {errors?.bedrooms?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-select-standard-label" required>
                Select Bathrooms
              </InputLabel>
              <Select
                label="Select Bathrooms"
                value={bathrooms ?? ""}
                {...Bathrooms}
                onChange={(e) => {
                  Bathrooms.onChange(e);
                  setBathrooms(e.target.value);
                }}
              >
                <MenuItem value = {bathrooms}>Select</MenuItem>
                {bath.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {errors?.bathrooms?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-select-standard-label" required>
                Select Storey
              </InputLabel>
              <Select
                label="Select Storey"
                value={storey ?? ""}
                {...Storey}
                onChange={(e) => {
                  Storey.onChange(e);
                  setStorey(e.target.value);
                }}
              >
                <MenuItem value={storey}>Select</MenuItem>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
              </Select>
              {errors?.storey?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl>
              <FormLabel required>Ownership</FormLabel>
              <RadioGroup
                value={ownership ??""}
                {...Ownership}
                onChange={(e) => {
                  Ownership.onChange(e);
                  setOwnership(e.target.value);
                }}
              >
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(6, 1fr)"
                  gap={2}
                >
                  <Box gridColumn="span 6">
                    <FormControlLabel
                      value="Owned"
                      control={<Radio />}
                      label="Owned"
                    />
                    <FormControlLabel
                      value="Rented"
                      control={<Radio />}
                      label="Rented"
                    />
                  </Box>
                </Box>
              </RadioGroup>
              {errors?.ownership?.type === "required" && (
                <p className="red-text">This field is required</p>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-select-standard-label" required>
                Due Status
              </InputLabel>
              <Select
                label="Select Type"
                value={duestatus ?? ""}
                {...Duestatus}
                onChange={(e) => {
                  Duestatus.onChange(e);
                  setDuestatus(e.target.value);
                }}
              >
                <MenuItem value={duestatus}>Select</MenuItem>
                <MenuItem value={"Paid"}>Paid</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
              {errors?.duestatus?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-select-standard-label" required>
                Select Type
              </InputLabel>
              <Select
                label="Select Type"
                value={hometype ?? ""}
                defaultValue=""
                {...Hometype}
                onChange={(e) => {
                  Hometype.onChange(e);
                  setHometype(e.target.value);
                }}
              >
                <MenuItem value={hometype}>Select</MenuItem>
                <MenuItem value={"Single family"}>Single Family</MenuItem>
                <MenuItem value={"Town home"}>Town Home</MenuItem>
                <MenuItem value={"Condo"}>Condo</MenuItem>
              </Select>
              {errors?.hometype?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-amount" required>
                Home Value
              </InputLabel>
              <OutlinedInput
                type="number"
                value={homevalue}
                {...Homevalue}
                onChange={(e) => {
                  Homevalue.onChange(e);
                  setHomevalue(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Home Value"
              />
              {errors?.homevalue?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
              {errors?.homevalue?.type === "maxLength" && (
                <p className="red-text">You can enter 0-999,999,999.99 only</p>
              )}
              {errors?.homevalue?.type === "min" && (
                <p className="red-text">Negative digits not allowed</p>
              )}
            </FormControl>
          </Box>

          <Box gridColumn="span 4">
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-amount" required>
                Tax Assessment{" "}
              </InputLabel>
              <OutlinedInput
                type="number"
                value={taxassessment}
                {...Taxassessment}
                onChange={(e) => {
                  Taxassessment.onChange(e);
                  setTaxassessment(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Tax Assessment"
              />
              {errors?.taxassessment?.type === "required" && (
                <span className="red-text">This field is required</span>
              )}
              {errors?.taxassessment?.type === "maxLength" && (
                <p className="red-text">You can enter 0-999,999,999.99 only</p>
              )}
              {errors?.taxassessment?.type === "min" && (
                <p className="red-text">Negative digits not allowed</p>
              )}
            </FormControl>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Features;
