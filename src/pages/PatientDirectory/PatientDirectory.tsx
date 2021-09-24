import React from 'react';

import { TextField, Select } from '@orfium/ictinus';
import { SelectOption } from '@orfium/ictinus/dist/components/Select/Select';
import { useGetHospitals, useGetPatients } from 'hooks/api/patientHooks';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';

import PatientCard from './components/PatientCard';
import {
  PatientDirectoryContainer,
  SearchWrapper,
  Line,
  PatientsList,
} from './PatientDirectory.style';

const PatientDirectory: React.FC = () => {
  /** TODO: debounce search */
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [hospitalId, setHospitalId] = React.useState<number>();

  const { data: patients } = useGetPatients({
    offset: 0,
    limit: 100,
    search_term: searchTerm,
    hospital_id: hospitalId,
  });

  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });

  return (
    <PatientDirectoryContainer>
      <SearchWrapper>
        <TextField
          type={'outlined'}
          placeholder={'Search (Name , ID, Patient Hospital ID ...)'}
          leftIcon={'search'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }
          value={searchTerm}
        />
        <Select
          label="Center"
          styleType="outlined"
          size="sm"
          required
          options={getHospitalOptions(hospitals?.results || [])}
          handleSelectedOption={(option: SelectOption) =>
            setHospitalId(parseInt(option.value.toString()))
          }
        />
      </SearchWrapper>

      {patients && (
        <PatientsList>
          {patients.results.map((patient) => (
            <div key={`patient_${patient.national_id}_${patient.hospitals[0].id}`}>
              <PatientCard {...patient} />
              <Line key={'patient_line_' + patient.full_name} />
            </div>
          ))}
        </PatientsList>
      )}
    </PatientDirectoryContainer>
  );
};

export default PatientDirectory;
