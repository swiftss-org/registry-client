import React, { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material';
import { LoginFormType } from 'models/apiTypes';
import { scrollToError } from 'utils/formUtils';

type Props = {
  onSubmit: (data: LoginFormType) => void;
  isPending?: boolean;
};

const LoginForm: React.FC<Props> = ({ onSubmit, isPending }) => {
  const [values, setValues] = useState<LoginFormType>({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const validate = (currentValues: LoginFormType) => {
    const newErrors: Record<string, string> = {};
    if (!currentValues.username) newErrors.username = 'Username is required';
    if (!currentValues.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(newErrors);
      setTouched({
        username: true,
        password: true
      });

      scrollToError(newErrors);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.username && !!errors.username}
        helperText={touched.username && errors.username}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && !!errors.password}
        helperText={touched.password && errors.password}
      />
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            name="rememberMe"
            checked={values.rememberMe}
            onChange={handleChange}
          />
        }
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isPending}
        sx={{ mt: 3, mb: 2 }}
        size="large"
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
