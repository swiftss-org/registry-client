/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

import { IconButton, Filter } from '@orfium/ictinus';
import { FilterOption } from '@orfium/ictinus/dist/components/Filter/types';
import { ReactComponent as SortIcon } from 'assets/PatientDirectory/sortIcon.svg';
import { useGetHospitals, useGetPatients } from 'hooks/api/patientHooks';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';
import { useHistory } from 'react-router';
import urls from 'routing/urls';

import PatientCard from './components/PatientCard';
import SortingOptions from './components/SortingOptions';
import {
  PatientDirectoryContainer,
  PatientsList,
  IconButtonWrapper,
  Title,
  OptionsWrapper,
} from './PatientDirectory.style';
import { SortingOptionsType } from './types';

const PatientDirectory: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const [hospitalId, setHospitalId] = useState<number>();

  const [sortingOption, setSortingOption] = useState<SortingOptionsType>('name');

  const { data: patients } = useGetPatients({
    offset: 0,
    limit: 100,
    search_term: searchTerm,
    hospital_id: hospitalId,
  });

  const [showSortingOptions, setshowSortingOptions] = useState(false);

  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });

  useEffect(() => {
    if (hospitals) {
      setHospitalId(hospitals?.results[0].id);
    }
  }, [hospitals]);

  const history = useHistory();

  const filterOptions = getHospitalOptions(hospitals?.results || []);
  const [selectedOption, setSelectedOption] = useState(filterOptions?.[0]?.value);

  return (
    <>
      <PatientDirectoryContainer>
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
            buttonType="primary"
          />
          <SortIcon onClick={() => setshowSortingOptions(!showSortingOptions)} />
        </OptionsWrapper>

        {patients && (
          <PatientsList>
            {patients.results.map((patient) => (
              <div
                key={`patient_${patient.national_id}_${patient.hospitals?.[0]?.id}`}
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
            size={'lg'}
            onClick={() => history.push(urls.register())}
          />
        </IconButtonWrapper>
      </PatientDirectoryContainer>

      {showSortingOptions && (
        <SortingOptions
          title={'Sort by options:'}
          sortingOption={sortingOption}
          onSortingOptionChange={(option: SortingOptionsType) => setSortingOption(option)}
          onClose={() => setshowSortingOptions(false)}
        />
      )}
    </>
  );
};

export default PatientDirectory;
