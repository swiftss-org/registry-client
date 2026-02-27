import React, { useEffect, useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { ChangePasswordFormType } from 'models/apiTypes';
import { scrollToError } from 'utils/formUtils';

import { useSetNotification } from '../../../../hooks/useSetNotification';

type Props = {
  onSubmit: (data: ChangePasswordFormType) => void;
  isPending: boolean;
  onDirtyChange?: (isDirty: boolean) => void;
};

const ChangePasswordForm: React.FC<Props> = ({ onSubmit, isPending, onDirtyChange }) => {
  const [values, setValues] = useState<ChangePasswordFormType>({
    old_password: '',
    new_password1: '',
    new_password2: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setNotification = useSetNotification();

  useEffect(() => {
    const isDirty = Object.values(values).some(val => val !== '');
    if (onDirtyChange) onDirtyChange(isDirty);
  }, [values, onDirtyChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const validate = (currentValues: ChangePasswordFormType) => {
    const newErrors: Record<string, string> = {};
    if (!currentValues.old_password) {
      newErrors.old_password = 'Old password is required';
    }
    if (!currentValues.new_password1) {
      newErrors.new_password1 = 'New password is required';
    }
    if (!currentValues.new_password2) {
      newErrors.new_password2 = 'Please confirm your new password';
    } else if (currentValues.new_password1 !== currentValues.new_password2) {
      newErrors.new_password2 = 'Passwords do not match';
    }
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
        old_password: true,
        new_password1: true,
        new_password2: true
      });
      setNotification('Please fix the errors in the form.', 'error');

      scrollToError(newErrors);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, maxWidth: 400, mx: 'auto' }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="old_password"
        label="Old Password"
        type="password"
        id="old_password"
        autoComplete="current-password"
        value={values.old_password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.old_password && !!errors.old_password}
        helperText={touched.old_password && errors.old_password}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="new_password1"
        label="New Password"
        type="password"
        id="new_password1"
        value={values.new_password1}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.new_password1 && !!errors.new_password1}
        helperText={touched.new_password1 && errors.new_password1}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="new_password2"
        label="Confirm New Password"
        type="password"
        id="new_password2"
        value={values.new_password2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.new_password2 && !!errors.new_password2}
        helperText={touched.new_password2 && errors.new_password2}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          display: { xs: 'flex', md: 'none' },
          zIndex: 1000,
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
          size="large"
        >
          Change Password
        </Button>
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 3 }}>
        <Button
          id="change-password-button"
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
          size="large"
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
