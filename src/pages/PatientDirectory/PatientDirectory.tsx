/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import SortIcon from '@mui/icons-material/Sort';
import { IconButton, Select, MenuItem } from '@mui/material';
import { PageWrapper, PageTitle } from 'common.style';
import { useGetHospitals, useGetPatients, useGetPreferredHospital } from 'hooks/api/patientHooks';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';
import { useNavigate } from 'react-router';
import urls from 'routing/urls';

import PatientCard from './components/PatientCard';
import SortingOptions from './components/SortingOptions';
import { PatientsList, IconButtonWrapper, OptionsWrapper } from './PatientDirectory.style';
import { SortingOptionsType } from './types';
import Notifications from '../../components/Notifications';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

const PatientDirectory: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const { isDesktop } = useResponsiveLayout();
  const [hospitalId, setHospitalId] = useState<number>();
  const [sortingOption, setSortingOption] = useState<SortingOptionsType>(
    (localStorage.getItem('sortingOption') as SortingOptionsType) || '-created_at'
  );

  const { data: patients } = useGetPatients({
    offset: 0,
    limit: 100,
    search_term: searchTerm,
    hospital_id: hospitalId,
    ordering: sortingOption,
  });

  const [showSortingOptions, setShowSortingOptions] = useState(false);

  const { data: hospitals } = useGetHospitals({ offset: 0, limit: 100 });

  const { data: preferredHospital } = useGetPreferredHospital();

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (hospitals && isFirstLoad.current) {
      if (preferredHospital && preferredHospital.hospital) {
        setHospitalId(preferredHospital.hospital.id);
        setSelectedOption(preferredHospital.hospital.id);
        isFirstLoad.current = false;
      } else {
        setHospitalId(hospitals?.results[0].id);
        setSelectedOption(hospitals?.results[0].id);
      }
    }
  }, [hospitals, preferredHospital]);

  useEffect(() => {
    if (sortingOption) {
      localStorage.setItem('sortingOption', sortingOption);
    }
  }, [sortingOption]);

  const navigate = useNavigate();

  const filterOptions = getHospitalOptions(hospitals?.results || []);
  const [selectedOption, setSelectedOption] = useState<number>();

  return (
    <>
      <PageWrapper isDesktop={isDesktop}>
        <Notifications />
        <PageTitle>Patients directory</PageTitle>
        <OptionsWrapper>
          <Select
            label="Center"
            value={selectedOption}
            onChange={(event) => {
              setSelectedOption(event.target.value as number);
              setHospitalId(event.target.value as number);
            }}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <IconButton onClick={() => setShowSortingOptions(!showSortingOptions)}>
            <SortIcon />
          </IconButton>
        </OptionsWrapper>

        {patients && (
          <PatientsList>
            {patients.results.map((patient) => (
              <div
                key={`patient_${patient.national_id}_${selectedOption}`}
                css={{ marginBottom: '8px' }}
              >
                <PatientCard {...patient} selectedHospital={selectedOption} />
              </div>
            ))}
          </PatientsList>
        )}
        <IconButtonWrapper>
          <IconButton
            color="primary"
            size="large"
            onClick={() => navigate(urls.registerPatient())}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </IconButtonWrapper>
      </PageWrapper>

      {showSortingOptions && (
        <SortingOptions
          title={'Sort by options:'}
          sortingOption={sortingOption}
          onSortingOptionChange={(option: SortingOptionsType) => {
            setSortingOption(option);
            setShowSortingOptions(false);
          }}
          onClose={() => setShowSortingOptions(false)}
        />
      )}
    </>
  );
};

export default PatientDirectory;
