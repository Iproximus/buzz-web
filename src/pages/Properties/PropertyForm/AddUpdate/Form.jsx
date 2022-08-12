import React, { useState } from "react";
import Address from './Address'
import Owner from './Owner'
import Features from './Features'
import Notification from "../../../../components/Notification";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import message from "../../../../helper/MessageText";
require('dotenv').config()

var countrycode = 0;
var statecode = 0;
var citycode = 0;
function Form(props) {
    const { register, trigger, getValues, formState: { errors } } = useForm();
    const [currentForm, setCurrentForm] = useState(0);
    const [file ,setFile] = useState()
    const passStatCity = (country, state, city) => {
        countrycode = country;
        statecode = state;
        citycode = city;
    }
    
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const history = useNavigate();
    const ApiURL = process.env.REACT_APP_API_HOST+process.env.REACT_APP_API_PORT;
    const forms = [
        {
            fields: ["uploadimg", "streetnumber", "streetname", "zipcode"],
            component: (register, errors) => (
                <Address
                    key={0}
                    shouldDisplay={currentForm === 0}
                    register={register}
                    errors={errors}
                    func={passStatCity}
                    data={props.propdata === null || undefined ? '':  props.propdata.updateproperty }
                    passingImage={imagesfile => setFile(imagesfile)}
                />
            )
        },

        {
            fields: ["firstname", "lastname", "phone", "email"],
            component: (register, errors) => (
                <Owner
                    key={1}
                    shouldDisplay={currentForm === 1}
                    register={register}
                    errors={errors}
                    data={props.propdata === null || undefined ? '':  props.propdata.updateproperty }
                />
            )
        },

        {
            fields: ["yearbuilt", "area", "lotarea", "bedrooms", "bathrooms", "storey", "ownership", "duestatus","hometype", "homevalue", "taxassessment"],
            component: (register, errors) => (
                <Features
                    key={2}
                    shouldDisplay={currentForm === 2}
                    register={register}
                    errors={errors}
                    data={props.propdata === null || undefined ? '':  props.propdata.updateproperty }
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
    
    const stepHeading = ['Address', 'Owner', 'Features']
    const prevButton = currentForm !== 0;
    const nextButton = currentForm !== forms.length - 1;
    const subbtn = (e) => {
        trigger(forms[currentForm].fields).then(valid => {
            if (valid) {
                if(props.addedit === null){addproperty(e)}
                else  {updateproperty(e)};
                }
        });
    }

    
async function postImage({ image }) {
    try{
    if(image){
    const formData = new FormData();
    formData.append("image", image);
    const result = await axios.post(ApiURL+'/s3bucket/addimages', formData,{headers: { 'Content-Type': 'multipart/form-data' }});
    return result.data;
    }else return null
} catch (err) {
    console.log(err);
}
  }
    const addproperty = async (e) => {
        e.preventDefault();
        try {
            const s3ImageToken =  postImage({image: file})
            const data = getValues();
            const uploadimg = s3ImageToken.Key
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
            const ownership = data.ownership;
            const duestatus = data.duestatus;
            const hometype = data.hometype;
            const homevalue = data.homevalue;
            const taxassessment = data.taxassessment;
            const dataobj = { uploadimg,streetnumber, streetname, country, state, city, zipcode, firstname, lastname, phone, email, yearbuilt, area, lotarea, bedrooms, bathrooms, storey, ownership,duestatus, hometype, homevalue, taxassessment }
            await axios.post(ApiURL+'/properties/addproperty', dataobj);
            
            setNotify({
                isOpen: true,
                message: message.PROPERTY_ADDED,
                type: 'success'
            })
            setTimeout(() => history('/dashboard'), 1000);
            setTimeout(() => history('/properties'), 1000);
        } catch (err) {
            console.log(err);
        }
       
};

const updateproperty = async (e) => {
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
        const ownership = prop.ownership;
        const duestatus = prop.duestatus;
        const hometype = prop.hometype;
        const homevalue = prop.homevalue;
        const taxassessment = prop.taxassessment;
        await axios.patch(ApiURL+'/properties/updateproperty/' + props.propdata.updateproperty._id,
            {
                streetnumber, streetname, country, state, city, zipcode,
                firstname, lastname, phone, email, yearbuilt, area,
                lotarea, bedrooms, bathrooms, storey, ownership,duestatus, hometype,
                homevalue, taxassessment
            }
        );
    } catch (err) {
        console.log(err);
    }
    
    setNotify({
        isOpen: true,
        message: message.PROPERTY_UPDATED,
        type: 'success'
    })
    setTimeout(() => history('/dashboard'), 1000);
    setTimeout(() => history('/properties'), 1000);
};

return (
    <div style={{marginTop: '-25px'}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            {currentForm < 3 && ( <p style={{ color: "green" }}>Step {currentForm + 1} of 3 </p> )}
            <h2 style={{ marginLeft: "15px" }}>{stepHeading[currentForm] }</h2>
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

export default Form;
