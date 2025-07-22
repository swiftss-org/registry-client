/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';

import { IconButton, Filter } from '@orfium/ictinus';
import { FilterOption } from '@orfium/ictinus/dist/components/Filter/types';
import { ReactComponent as SortIcon } from 'assets/PatientDirectory/sortIcon.svg';
import { PageWrapper, PageTitle } from 'common.style';
import { useGetHospitals, useGetPatients, useGetPreferredHospital } from 'hooks/api/patientHooks';
import { getHospitalOptions } from 'pages/RegisterPatient/utils';
import { useHistory } from 'react-router';
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

  const history = useHistory();

  const filterOptions = getHospitalOptions(hospitals?.results || []);
  const [selectedOption, setSelectedOption] = useState<number>();

  return (
    <>
      <PageWrapper isDesktop={isDesktop}>
        <Notifications />
        <PageTitle>Patients directory</PageTitle>
        <OptionsWrapper>
          <Filter
            label="Center"
            items={filterOptions}
            defaultValue={filterOptions.length > 0 ? filterOptions[0] : { label: '', value: -1 }}
            selectedItem={filterOptions.find((option) => option.value === selectedOption)}
            onSelect={(option: FilterOption) => {
              setSelectedOption(option.value as number);
              setHospitalId(parseInt(option.value.toString()));
            }}
            styleType="transparent"
            buttonType="primary"
          />
          <SortIcon onClick={() => setShowSortingOptions(!showSortingOptions)} />
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
            name="plus"
            color={'blue-400'}
            filled
            iconSize={24}
            size={'lg'}
            onClick={() => history.push(urls.registerPatient())}
          />
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
