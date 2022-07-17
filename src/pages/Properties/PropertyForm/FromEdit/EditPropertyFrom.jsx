import React, { useState } from "react";
import EditPropertyDetails from "./EditPropertyDetails";
import EditLandDetails from "./EditLandDetails";
import EditOwnerDetails from "./EditOwnerDetails";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Box, Button } from '@mui/material';
import Notification from "../../../../components/Notification";
import { useNavigate } from "react-router-dom";


var countrycode = 0;
var statecode = 0;
var citycode = 0;
const EditPropertyFrom = (props) => {

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
                <EditPropertyDetails
                    key={0}
                    shouldDisplay={currentForm === 0}
                    register={register}
                    errors={errors}
                    func={passStatCity}
                    data={props.propdata.updateproperty}
                />
            )
        },

        {
            fields: ["firstname", "lastname", "phone", "email"],
            component: (register, errors) => (
                <EditOwnerDetails
                    key={1}
                    shouldDisplay={currentForm === 1}
                    register={register}
                    errors={errors}
                    data={props.propdata.updateproperty}

                />
            )
        },

        {
            fields: ["yearbuilt", "area", "lotarea", "bedrooms", "bathrooms", "storey", "landtype", "hometype", "homevalue", "taxassessment"],
            component: (register, errors) => (
                <EditLandDetails
                    key={2}
                    shouldDisplay={currentForm === 2}
                    register={register}
                    errors={errors}
                    data={props.propdata.updateproperty}
                />
            )
        }
    ];

    passStatCity();


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
    const stepHeading = ['Edit Property Details', 'Edit Owner Details', 'Edit Land Details']
    const prevButton = currentForm !== 0;
    const nextButton = currentForm !== forms.length - 1;

    const subbtn = (e) => {
        trigger(forms[currentForm].fields).then(valid => {
            if (valid) { handleSubmit(e); }
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const prop = getValues();
            const streetnumber = prop.streetnumber;
            const streetname = prop.streetname;
            const country = prop.countrycode
            const state = prop.statecode;
            const city = prop.citycode;
            const zipcode = prop.zipcode;
            const firstname = prop.firstname;
            const lastname = prop.lastname;
            const phone = prop.phone;
            const email = prop.email;
            const yearbuilt = prop.yearbuilt;
            const area = prop.area;
            const lotarea = prop.lotarea;
            const bedrooms = prop.bedrooms;
            const bathrooms = prop.bathrooms;
            const storey = prop.storey;
            const landtype = prop.landtype;
            const hometype = prop.hometype;
            const homevalue = prop.homevalue;
            const taxassessment = prop.taxassessment;
            await axios.patch('http://localhost:3000/propertys/updateproperty/' + props.propdata.updateproperty._id,
                {
                    streetnumber, streetname, country, state, city, zipcode,
                    firstname, lastname, phone, email, yearbuilt, area,
                    lotarea, bedrooms, bathrooms, storey, landtype, hometype,
                    homevalue, taxassessment
                }
            );
        } catch (err) {
            console.log(err);
        }
        setNotify({
            isOpen: true,
            message: 'Property updated successfully',
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

export default EditPropertyFrom;
