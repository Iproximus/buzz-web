import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';

const initialFValues = {
    id: 0,
    firstname: '',
    lastname: '',
    emailid: '',
    role: '',
    phnumber: '',
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstname' in fieldValues)
            temp.firstname = fieldValues.firstname ? "" : "This field is required."
        if ('lastname' in fieldValues)
            temp.lastname = fieldValues.lastname ? "" : "This field is required."
        if ('emailid' in fieldValues)
            temp.emailid = (/$^|.+@.+..+/).test(fieldValues.emailid) ? "" : "Email is not valid."
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? "" : "This field is required."
        if ('phnumber' in fieldValues)
            temp.phnumber = fieldValues.phnumber.length < 10 || fieldValues.phnumber.length > 10 ? "Minimum 10 numbers required." : ""
      
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
                <Grid item xs={12}>
                    <Controls.Input
                        name="firstname"
                        label="First Name"
                        value={values.firstname}
                        onChange={handleInputChange}
                        error={errors.firstname}
                    />
                    <Controls.Input
                        name="lastname"
                        label="Last Name"
                        value={values.lastname}
                        onChange={handleInputChange}
                        error={errors.lastname}
                    />
                    <Controls.Input
                        name="emailid"
                        label="Email"
                        value={values.emailid}
                        onChange={handleInputChange}
                        error={errors.emailid}
                    />
                    <Controls.Input
                        name="role"
                        label="Role"
                        value={values.role}
                        onChange={handleInputChange}
                        error={errors.role}
                    />

                    <Controls.Input
                        name="phnumber"
                        label="Mobile"
                        value={values.phnumber}
                        onChange={handleInputChange}
                        error={errors.phnumber}
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
                    {/* <Controls.Input
                        name="city"
                        label="City"
                        value={values.city}
                        onChange={handleInputChange}
                    /> */}

                </Grid>
                {/* <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    /> 
                   
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />                   
                </Grid> */}
            </Grid>
        </Form>
    )
}
