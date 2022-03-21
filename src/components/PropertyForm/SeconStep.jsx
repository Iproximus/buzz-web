import React from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup, TextField,Button} from '@mui/material';

const SecondStep = (props) => {
  const { register, handleSubmit, formState:{ errors }} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 offset-md-3">
        <FormGroup controlId="first_name">
          <TextField
            type="email"
            name="user_email"
            variant="outlined" 
            label = "Email"
            placeholder="Enter your email address"
            autoComplete="off"
            {...register('email',{
              required: 'Email is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.'
              }
            })}
            className={`${errors.user_email ? 'input-error' : ''}`}
          />
          {errors.user_email && (
            <p className="errorMsg">{errors.user_email.message}</p>
          )}
        </FormGroup>

        <FormGroup controlId="password">
          <TextField
            type="password"
            name="user_password"
            variant="outlined" 
            label = "Password"
            placeholder="Choose a password"
            autoComplete="off"
            {...register('password',{
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password should have at-least 6 characters.'
              }
            })}
            className={`${errors.user_password ? 'input-error' : ''}`}
          />
          {errors.user_password && (
            <p className="errorMsg">{errors.user_password.message}</p>
          )}
        </FormGroup>

        <Button variant="primary" variant="contained" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
};

export default SecondStep;