import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as propertyService from "../../services/propertyService";


const statusItems = [
    { id: 'owned', title: 'Owned' },
    { id: 'rented', title: 'Rented' },
]

const initialFValues = {
    id: 0,
    smallPicture: '',
    streetNumber: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    documents:'',
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    yearBuilt: '',
    area: '',
    lotArea: '',
    bedRooms: '',
    bathRooms: '',
    storey: '',
    ownedOrRented: 'owned',
    typeId: '',
    schoolDistrict: '',
    elementarySchool: '',
    middleSchool: '',
    highSchool: ''
}

export default function PropertyForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('samplePicture' in fieldValues)
            temp.samplePicture = fieldValues.samplePicture ? "" : "This field is required."
        if ('streetNumber' in fieldValues)
            temp.streetNumber = fieldValues.streetNumber ? "" : "This field is required."
        if ('street' in fieldValues)
            temp.street = fieldValues.street ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('state' in fieldValues)
            temp.state = fieldValues.state ? "" : "This field is required."
        if ('zip' in fieldValues)
            temp.zip = fieldValues.zip ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length < 10 || fieldValues.phone.length > 10 ? "Minimum 10 numbers required." : ""
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('schoolDistrict' in fieldValues)
            temp.schoolDistrict = fieldValues.schoolDistrict ? "" : "This field is required."
        if ('primarySchool' in fieldValues)
            temp.elementarySchool = fieldValues.elementarySchool ? "" : "This field is required."
        if ('middleSchool' in fieldValues)
            temp.middleSchool = fieldValues.middleSchool ? "" : "This field is required."
        if ('highSchool' in fieldValues)
            temp.highSchool = fieldValues.highSchool ? "" : "This field is required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={4}>
                    <h5>LOCATION</h5>
                    <Controls.FileInput
                        name="smallPicture"
                        label="Upload Picture"
                        value={values.smallPicture}
                        onChange={handleInputChange}
                        error={errors.smallPicture}
                    />
                    <Controls.Input
                        name="streetNumber"
                        label="Street Number"
                        value={values.streetNumber}
                        onChange={handleInputChange}
                        error={errors.streetNumber}
                    />
                    <Controls.Input
                        name="street"
                        label="Street Name"
                        value={values.street}
                        onChange={handleInputChange}
                        error={errors.street}
                    />
                    <Controls.Input
                        name="city"
                        label="City"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />
                    <Controls.Input
                        name="state"
                        label="State"
                        value={values.state}
                        onChange={handleInputChange}
                        error={errors.state}
                    />
                    <Controls.Input
                        name="zip"
                        label="Zip Code"
                        value={values.zip}
                        onChange={handleInputChange}
                        error={errors.zip}
                    />
                      <Controls.FileInput
                        name="documents"
                        label="Upload Documents"
                        value={values.documents}
                        onChange={handleInputChange}
                        error={errors.documents}
                    />

                </Grid>
                <Grid item xs={4}>
                    <h5>OWNER DETAILS</h5>
                    <Controls.Input
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    <Controls.Input
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    <Controls.Input
                        name="phone"
                        label="Mobile"
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />

                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <h5>School Details</h5>
                    <Controls.Input
                        name="schoolDistrict"
                        label="School District"
                        value={values.schoolDistrict}
                        onChange={handleInputChange}
                        error={errors.schoolDistrict}
                    />

                    <Controls.Input
                        name="elementarySchool"
                        label="Elementary School"
                        value={values.elementarySchool}
                        onChange={handleInputChange}
                        error={errors.elementarySchool}
                    />
                    <Controls.Input
                        name="middleSchool"
                        label="Middle School"
                        value={values.middleSchool}
                        onChange={handleInputChange}
                        error={errors.middleSchool}
                    />
                    <Controls.Input
                        name="highSchool"
                        label="High School"
                        value={values.highSchool}
                        onChange={handleInputChange}
                        error={errors.highSchool}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>

                </Grid>
                <Grid item xs={4}>
                    <h5>PROPERTY DETAILS</h5>
                    <Controls.Input
                        name="yearBuilt"
                        label="Year Built"
                        value={values.yearBuilt}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />

                    <Controls.Input
                        name="area"
                        label="Area"
                        value={values.area}
                        onChange={handleInputChange}
                        error={errors.area}
                    />
                    <Controls.Input
                        name="lotArea"
                        label="Lot Area"
                        value={values.lotArea}
                        onChange={handleInputChange}
                        error={errors.lotArea}
                    />
                    <Controls.Input
                        name="bedRooms"
                        label="Bed Rooms"
                        value={values.bedRooms}
                        onChange={handleInputChange}
                        error={errors.bedRooms}
                    />
                    <Controls.Input
                        name="bathRooms"
                        label="Bath Rooms"
                        value={values.bathRooms}
                        onChange={handleInputChange}
                        error={errors.bathRooms}
                    />
                    <Controls.Input
                        name="storey"
                        label="Storey"
                        value={values.storey}
                        onChange={handleInputChange}
                        error={errors.storey}
                    />
                    <Controls.RadioGroup
                        name="ownedOrRented"
                        label="Home Status"
                        value={values.ownedOrRented}
                        onChange={handleInputChange}
                        items={statusItems}
                    />
                    <Controls.Select
                        name="typeId"
                        label="Type"
                        value={values.typeId}
                        onChange={handleInputChange}
                        options={propertyService.getTypeCollection()}
                        error={errors.typeId}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
