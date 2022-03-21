import React from 'react';
import { FormGroup, TextField,Button} from '@mui/material';
import { useForm } from 'react-hook-form';

const divStyle = { marginTop: '70px', background: 'white'}

const FirstStep = () => {
    const { register, handleSubmit,formState:{ errors }} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>

            <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div style={divStyle}>
                    <FormGroup controlId="first_name">
                        <TextField
                            type="text"
                            variant="outlined" 
                            label="First name"
                            name="first_name"
                            placeholder="Enter your first name"
                            autoComplete="off"
                            {...register('first_name',{
                                required: 'First name is required.',
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: 'First name should contain only characters.'
                                }
                            })}
                            className={`${errors.first_name ? 'input-error' : ''}`}
                        />
                        {errors.first_name && (
                            <p className="errorMsg">{errors.first_name.message}</p>
                        )}
                    </FormGroup>

                    <FormGroup controlId="last_name">
                        <TextField
                            type="text"
                            name="last_name"
                            variant="outlined" 
                            label="Last name"
                            placeholder="Enter your last name"
                            autoComplete="off"
                            {...register('last_name',{
                                required: 'Last name is required.',
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: 'Last name should contain only characters.'
                                }
                            })}
                            className={`${errors.last_name ? 'input-error' : ''}`}
                        />
                        {errors.last_name && (
                            <p className="errorMsg">{errors.last_name.message}</p>
                        )}
                    </FormGroup>

                    <Button variant="primary" variant="contained" type="submit">
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
};

export default FirstStep;