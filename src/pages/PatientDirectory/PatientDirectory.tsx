/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { IconButton, Filter } from '@orfium/ictinus';
import { FilterOption } from '@orfium/ictinus/dist/components/Filter/types';
import { useGetHospitals, useGetPatients } from 'hooks/api/patientHooks';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';
import { useHistory } from 'react-router';
import urls from 'routing/urls';

import PatientCard from './components/PatientCard';
import {
  PatientDirectoryContainer,
  PatientsList,
  IconButtonWrapper,
  Title,
  OptionsWrapper,
} from './PatientDirectory.style';

const PatientDirectory: React.FC = () => {
  /** TODO: debounce search */
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hospitalId, setHospitalId] = useState<number>();

  const { data: patients } = useGetPatients({
    offset: 0,
    limit: 100,
    search_term: searchTerm,
    hospital_id: hospitalId,
  });

  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });

  const history = useHistory();

  const filterOptions = getHospitalOptions(hospitals?.results || []);
  const [selectedOption, setSelectedOption] = useState(filterOptions?.[0]?.value);

  return (
    <PatientDirectoryContainer>
      {/* <SearchWrapper>
        <TextField
          type={'outlined'}
          placeholder={'Search (Name , ID, Patient Hospital ID ...)'}
          leftIcon={'search'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }
          value={searchTerm}
        />
      </SearchWrapper> */}
      <Title>Patients directory</Title>
      <OptionsWrapper>
        <Filter
          label="Center"
          items={filterOptions}
          defaultValue={filterOptions.length > 0 ? filterOptions[0] : { label: '', value: '' }}
          selectedItem={filterOptions.find((option) => option.value === selectedOption)}
          onSelect={(option: FilterOption) => {
            setSelectedOption(option.value);
            setHospitalId(parseInt(option.value.toString()));
          }}
          styleType="transparent"
          buttonType="secondary"
        />
      </OptionsWrapper>

      {patients && (
        <PatientsList>
          {patients.results.map((patient) => (
            <div
              key={`patient_${patient.national_id}_${patient.hospitals[0]?.id}`}
              css={{ marginBottom: '8px' }}
            >
              <PatientCard {...patient} />
            </div>
          ))}
        </PatientsList>
      )}
      <IconButtonWrapper>
        <IconButton
          name="plus"
          color={'blue-400'}
          filled
          iconSize={24}
          onClick={() => history.push(urls.register())}
        />
      </IconButtonWrapper>
    </PatientDirectoryContainer>
  );
};

export default PatientDirectory;
