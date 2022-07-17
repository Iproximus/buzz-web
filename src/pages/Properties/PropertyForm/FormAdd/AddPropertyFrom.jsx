import React, { useState } from "react";
import PropertyDetails from '../FormAdd/PropertyDetails'
import OwnerDetails from '../FormAdd/OwnerDetails'
import LandDetails from '../FormAdd/LandDetails'
import Notification from "../../../../components/Notification";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

var countrycode = 0;
var statecode = 0;
var citycode = 0;
function AddPropertyFrom() {

    const { register, trigger, getValues, formState: { errors } } = useForm();
    const [currentForm, setCurrentForm] = useState(0);
    const passStatCity = (country, state, city) => {
        countrycode = country;
        statecode = state;
        citycode = city;
    }
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const history = useNavigate();
    const forms = [
        {
            fields: ["uploadimg", "streetnumber", "streetname", "zipcode"],
            component: (register, errors) => (
                <PropertyDetails
                    key={0}
                    shouldDisplay={currentForm === 0}
                    register={register}
                    errors={errors}
                    func={passStatCity}
                />
            )
        },

        {
            fields: ["firstname", "lastname", "phone", "email"],
            component: (register, errors) => (
                <OwnerDetails
                    key={1}
                    shouldDisplay={currentForm === 1}
                    register={register}
                    errors={errors}
                />
            )
        },

        {
            fields: ["yearbuilt", "area", "lotarea", "bedrooms", "bathrooms", "storey", "landtype", "hometype", "homevalue", "taxassessment"],
            component: (register, errors) => (
                <LandDetails
                    key={2}
                    shouldDisplay={currentForm === 2}
                    register={register}
                    errors={errors}
                />
            )
        }
    ];

    const moveToPrevious = () => {
        trigger(forms[currentForm].fields).then(valid => {
            if (valid) setCurrentForm(currentForm - 1);
        });
    };

    const moveToNext = () => {
        trigger(forms[currentForm].fields).then(valid => {
            if (valid) setCurrentForm(currentForm + 1);
        });
    };
    const stepHeading = ['Property Details', 'Owner Details', 'Land Details']
    const prevButton = currentForm !== 0;
    const nextButton = currentForm !== forms.length - 1;
    const subbtn = (e) => {
        trigger(forms[currentForm].fields).then(valid => {
            if (valid) { handleSubmit(e); }
        });
    }

    const handleSubmit = async (e) => {
        //e.preventDefault();
        try {
            const data = getValues();
            const streetnumber = data.streetnumber;
            const streetname = data.streetname;
            const country = countrycode
            const state = statecode;
            const city = citycode;
            const zipcode = data.zipcode;
            const firstname = data.firstname;
            const lastname = data.lastname;
            const phone = data.phone;
            const email = data.email;
            const yearbuilt = data.yearbuilt;
            const area = data.area;
            const lotarea = data.lotarea;
            const bedrooms = data.bedrooms;
            const bathrooms = data.bathrooms;
            const storey = data.storey;
            const landtype = data.landtype;
            const hometype = data.hometype;
            const homevalue = data.homevalue;
            const taxassessment = data.taxassessment;
            const dataobj = { streetnumber, streetname, country, state, city, zipcode, firstname, lastname, phone, email, yearbuilt, area, lotarea, bedrooms, bathrooms, storey, landtype, hometype, homevalue, taxassessment }
            await axios.post('http://localhost:3000/propertys/addpropertys', dataobj);
        } catch (err) {
            console.log(err);
        }

        setNotify({
            isOpen: true,
            message: 'Property added successfully',
            type: 'success'
        })
        
        setTimeout(() => history('/dashboard'), 1000);
        setTimeout(() => history('/properties'), 1000);
        
        
};

return (
    <div>

        <div style={{ display: "flex", alignItems: "center" }}>
            {currentForm < 3 && (
                <p style={{ color: "green" }}>Step {currentForm + 1} of 3 </p>
            )}
            <h2 style={{ marginLeft: "15px" }}>{stepHeading[currentForm]}</h2>
        </div>

        {forms.map(form => form.component(register, errors))}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <Box style={{ marginRight: "10px" }} gridColumn="span 6">
                {prevButton && (<Button
                    variant="contained"
                    type="button"
                    style={{ backgroundColor: "#03045e" }}
                    onClick={moveToPrevious} > Back
                </Button>)}
            </Box>

            <Box gridColumn="span 6">
                {nextButton && (<Button
                    variant="contained"
                    type="button"
                    color="success"
                    onClick={moveToNext}> Next
                </Button>)}

                {currentForm === 2 && (
                    <Button
                        onClick={subbtn}
                        variant="contained"
                        color="success"
                        type="submit" > Submit
                    </Button>)}
            </Box>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    </div>
);
}

export default AddPropertyFrom;
