import React, { useEffect, useState } from 'react';

import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';

import { HospitalsAPI } from '../../../../models/apiTypes';
import { scrollToError } from '../../../../utils/formUtils';
import { RegisterPatientFormType } from '../../types';

type Props = {
    hospitals: HospitalsAPI[];
    onSubmit: (data: RegisterPatientFormType) => void;
    onDirtyChange?: (isDirty: boolean) => void;
};

const initialValues = {
    hospital: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nationalId: '',
    patientHospitalId: '',
    gender: '',
    yearOfBirth: '',
    monthOfBirth: '',
    dayOfBirth: '',
    phone1: '',
    phone2: '',
    address: '',
};

const RegisterPatientForm: React.FC<Props> = ({
    hospitals,
    onSubmit,
    onDirtyChange,
}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const isDirty = Object.values(values).some((value) => value !== '');
        onDirtyChange?.(isDirty);
    }, [values, onDirtyChange]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
        const { name, value } = e.target;
        setValues({ ...values, [name as string]: value });
        if (errors[name as string]) {
            setErrors({ ...errors, [name as string]: '' });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!values.hospital) newErrors.hospital = 'Hospital field is required';
        if (!values.firstName) newErrors.firstName = 'First name field is required';
        if (!values.lastName) newErrors.lastName = 'Last name field is required';
        if (!values.patientHospitalId) newErrors.patientHospitalId = 'Patient Hospital ID field is required';
        if (!values.yearOfBirth) newErrors.yearOfBirth = 'Year of birth field is required';
        if (!values.gender) newErrors.gender = 'Gender field is required. Please select the gender above.';
        if (!values.phone1) newErrors.phone1 = 'Phone #1 field is required';
        if (values.phone1.length > 16) newErrors.phone1 = 'Phone #1 can not be longer than 16 digits';
        if (values.phone2.length > 16) newErrors.phone2 = 'Phone #2 can not be longer than 16 digits';
        if (values.nationalId && !/^\d+$/.test(values.nationalId)) newErrors.nationalId = 'National ID field must be a number';
        if (values.patientHospitalId && !/^\d+$/.test(values.patientHospitalId)) newErrors.patientHospitalId = 'Patient Hospital ID field must be a number';

        return newErrors;
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLElement>
    ) => {
        const target = e.target as HTMLInputElement;
        setTouched({ ...touched, [target.name]: true });
        const newErrors = validate();
        setErrors(newErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            onSubmit({
                ...values,
                hospital: { value: Number(values.hospital), label: '' },
                patientHospitalId: values.patientHospitalId,
                nationalId: values.nationalId || undefined,
                yearOfBirth: Number(values.yearOfBirth),
                monthOfBirth: values.monthOfBirth ? Number(values.monthOfBirth) : undefined,
                dayOfBirth: values.dayOfBirth ? Number(values.dayOfBirth) : undefined,
                age: values.yearOfBirth
                    ? new Date().getFullYear() - Number(values.yearOfBirth)
                    : 0,
                phone1: values.phone1,
                phone2: values.phone2 || undefined,
                gender: values.gender.toLowerCase() as 'male' | 'female',
            } as RegisterPatientFormType);
        } else {
            setErrors(newErrors);
            const allTouched: Record<string, boolean> = {};
            Object.keys(values).forEach((key) => {
                allTouched[key] = true;
            });
            setTouched(allTouched);

            scrollToError(newErrors);
        }
    };

    return (

        <Box
            id="register-patient-form"
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column' }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.dark" gutterBottom>
                    Hospital Details
                </Typography>
                <FormControl fullWidth margin="normal" error={!!errors.hospital}>
                    <InputLabel>Hospital</InputLabel>
                    <Select
                        id="hospital"
                        name="hospital"
                        value={values.hospital}
                        label="Hospital"
                        onChange={(e: SelectChangeEvent) =>
                            handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
                        }
                        onBlur={handleBlur}
                    >
                        {hospitals.map((h) => (
                            <MenuItem key={h.id} value={h.id}>
                                {h.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.hospital}</FormHelperText>
                </FormControl>

                <TextField
                    id="patient_hospital_id"
                    label="Patient Hospital ID"
                    name="patientHospitalId"
                    value={values.patientHospitalId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.patientHospitalId && !!errors.patientHospitalId}
                    helperText={touched.patientHospitalId && errors.patientHospitalId}
                    fullWidth
                    margin="normal"
                    required
                />

                <Typography variant="h6" color="primary.dark" gutterBottom>
                    Personal Details
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            id="first_name"
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.firstName && !!errors.firstName}
                            helperText={touched.firstName && errors.firstName}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            id="middle_name"
                            label="Middle Name"
                            name="middleName"
                            value={values.middleName}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <TextField
                            id="last_name"
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.lastName && !!errors.lastName}
                            helperText={touched.lastName && errors.lastName}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Date of Birth
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                id="year_of_birth"
                                label="Year"
                                name="yearOfBirth"
                                type="number"
                                value={values.yearOfBirth}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.yearOfBirth && !!errors.yearOfBirth}
                                helperText={touched.yearOfBirth && errors.yearOfBirth}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                id="month_of_birth"
                                label="Month"
                                name="monthOfBirth"
                                type="number"
                                value={values.monthOfBirth}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                id="day_of_birth"
                                label="Day"
                                name="dayOfBirth"
                                type="number"
                                value={values.dayOfBirth}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3 }}>
                            <TextField
                                id="age"
                                label="Age"
                                value={
                                    values.yearOfBirth
                                        ? new Date().getFullYear() - Number(values.yearOfBirth)
                                        : ''
                                }
                                disabled
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <TextField
                                id="national_id"
                                label="National ID"
                                name="nationalId"
                                value={values.nationalId}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <FormControl component="fieldset" error={!!errors.gender}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel
                                value="Female"
                                control={<Radio />}
                                label="Female"
                            />
                        </RadioGroup>
                        <FormHelperText>{errors.gender}</FormHelperText>
                    </FormControl>
                </Box>

                <Typography variant="h6" color="primary.dark" gutterBottom>
                    Contact Details
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            id="phone1"
                            label="Phone #1"
                            name="phone1"
                            value={values.phone1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone1 && !!errors.phone1}
                            helperText={touched.phone1 && errors.phone1}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            id="phone2"
                            label="Phone #2"
                            name="phone2"
                            value={values.phone2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone2 && !!errors.phone2}
                            helperText={touched.phone2 && errors.phone2}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <TextField
                    id="address"
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

        </Box>
    );

};

export default RegisterPatientForm;
