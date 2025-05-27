import React, { useState } from 'react';

import { Button } from '@orfium/ictinus';
import {
  useGetSurgeonEpisodeSummary,
  useGetOwnedEpisodes,
  useGetUnlinkedPatients,
  useGetPreferredHospital, useGetAnnouncements,
} from 'hooks/api/patientHooks';
import { useHistory } from 'react-router-dom';
import urls from 'routing/urls';

import {
  ButtonContainer, PageTitle,
  PageWrapper,
} from '../../common.style';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';
import { OwnedEpisodeAPI } from '../../models/apiTypes';
import { DashboardText, DashboardTextHeader, DashboardWrapper } from './LandingPage.style';


const LandingPage: React.FC = () => {
  const { data: surgeonEpisodeSummary, error: surgeonError } = useGetSurgeonEpisodeSummary();
  const { data: ownedEpisodes = [], error: episodesError } = useGetOwnedEpisodes();
  const history = useHistory();
  const { isDesktop } = useResponsiveLayout();

  const { data: preferredHospital, isLoading: isLoadingHospital, error: hospitalError } = useGetPreferredHospital();
  const { data: unlinkedPatients = [] } = useGetUnlinkedPatients();

  // State to handle sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof OwnedEpisodeAPI | 'discharged';
    direction: 'ascending' | 'descending';
  }>({
    key: 'surgery_date', // Default sort by surgery date
    direction: 'descending',
  });

  // Function to handle sorting when a column header is clicked
  const handleSort = (key: keyof OwnedEpisodeAPI | 'discharged') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort ownedEpisodes based on sortConfig
  const sortedEpisodes = ownedEpisodes
    ? [...ownedEpisodes].sort((a: OwnedEpisodeAPI, b: OwnedEpisodeAPI) => {

        // Custom sorting for follow_up_dates
        if (sortConfig.key === 'follow_up_dates') {
          const aFollowUps = a.follow_up_dates.length;
          const bFollowUps = b.follow_up_dates.length;
          return sortConfig.direction === 'ascending'
            ? aFollowUps - bFollowUps
            : bFollowUps - aFollowUps;
        }

        // Custom sorting for discharge status
        if (sortConfig.key === 'discharged') {
          const aHasDischarge = a.discharge !== null ? 1 : 0; // 1 if has discharge, 0 if not
          const bHasDischarge = b.discharge !== null ? 1 : 0; // 1 if has discharge, 0 if not
          return sortConfig.direction === 'ascending' ? aHasDischarge - bHasDischarge : bHasDischarge - aHasDischarge;
        }

        // Fallback to other sorting keys
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
    : [];

  const handleRowClick = (episode: OwnedEpisodeAPI) => {
    const { hospital_id, patient_id, id } = episode;
    history.push(`${urls.patients()}/${hospital_id}/${patient_id}${urls.episodes()}/${id}`);
  };

  const [dismissedIds, setDismissedIds] = useState<number[]>([]);

  const { data: announcementsResponse, isLoading: isLoadingAnnouncements, error: announcementsError } = useGetAnnouncements();
  const announcements = announcementsResponse?.results ?? [];

  const dismissAnnouncement = (id: number) => {
  setDismissedIds((prev) => [...prev, id]);
  };

  return (
    <PageWrapper isDesktop={isDesktop}>
      {/* Render Announcements */}
      {announcementsError && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Failed to load announcements: {announcementsError.message}
        </div>
      )}


  <PageTitle>
  Surgeon Dashboard
  </PageTitle>
    <DashboardWrapper>



      {isLoadingAnnouncements && <div>Loading announcements...</div>}

      {announcements
        .filter((announcement) => !dismissedIds.includes(announcement.id))
        .map((announcement) => (
          <div
            key={announcement.id}
            style={{
              border: '2px solid #0d629e',
              backgroundColor: '#d5e6f2',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '1rem',
              position: 'relative',
            }}
          >
            <button
              onClick={() => dismissAnnouncement(announcement.id)}
              style={{
                position: 'absolute',
                top: '6px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#0d629e',
              }}
              aria-label="Dismiss"
            >
              ×
            </button>
            <div>{announcement.announcement_text}</div>
          </div>
      ))}

        <DashboardText>
          This is your personalized landing page with key insights on the episodes you have performed.
        </DashboardText>
        {/* Handle error state */}
        {surgeonError && <div style={{ color: 'red' }}>Failed to load surgeon stats: {surgeonError.message}</div>}
        {episodesError && <div style={{ color: 'red' }}>Failed to load episodes: {episodesError.message}</div>}

        {/* Render surgeon summary data */}
        {surgeonEpisodeSummary ? (
          <DashboardText>
            <p>Number of episodes: {surgeonEpisodeSummary.episode_count}</p>
            <p>
              Last episode:{' '}
              {surgeonEpisodeSummary.last_episode_date
                ? new Date(surgeonEpisodeSummary.last_episode_date).toLocaleDateString()
                : 'N/A'}
            </p>
          </DashboardText>
        ) : (

          <DashboardText>Loading surgeon summary...</DashboardText>
        )}

        {/* Display unlinked patients section */}
        {isLoadingHospital ? (
          <DashboardText>Loading preferred hospital...</DashboardText>
        ) : hospitalError ? (
          <DashboardText style={{ color: 'red' }}>
            Failed to load preferred hospital: {hospitalError.message}
          </DashboardText>
        ) : !preferredHospital || Object.keys(preferredHospital).length === 0 ? (
          <DashboardText style={{ color: 'red', fontStyle: 'italic' }}>
            Configure your preferred hospital to view any patients missing an episode.
          </DashboardText>
        ) : unlinkedPatients.length > 0 ? (
          <div style={{ marginBottom: '2rem' }}>
            <DashboardTextHeader>
              <h2>Patients without Episodes Registered in Your Hospital</h2>
            </DashboardTextHeader>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid lightgrey', padding: '8px' }}>Patient Name</th>
                    <th style={{ border: '1px solid lightgrey', padding: '8px' }}>Patient Hospital ID</th>
                  </tr>
                </thead>
                <tbody>
                  {unlinkedPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      onClick={() =>
                        history.push(`${urls.patients()}/${patient.hospital_id}/${patient.id}`)
                      }
                      style={{
                        backgroundColor: '#fc7c7c',
                        cursor: 'pointer',
                        borderBottom: '1px solid lightgrey',
                      }}
                    >
                      <td style={{ border: '1px solid lightgrey', padding: '8px' }}>{patient.full_name}</td>
                      <td style={{ border: '1px solid lightgrey', padding: '8px' }}>{patient.patient_hospital_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {/* Render owned episodes table */}
        {ownedEpisodes ? (
          ownedEpisodes.length > 0 ? (
            <div>
              <DashboardTextHeader>
                <h2>Your Episodes</h2>
              </DashboardTextHeader>
              <DashboardText>
                <p>
                  Click on a column header to order results by that column, or click on a row to see the details of that
                  episode.
                </p>
              </DashboardText>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSort('surgery_date')}
                      style={{ border: '1px solid lightgrey', padding: '8px', cursor: 'pointer' }}
                    >
                      Surgery Date{' '}
                      {sortConfig.key === 'surgery_date'
                        ? sortConfig.direction === 'ascending'
                          ? '↑'
                          : '↓'
                        : ''}
                    </th>
                    <th
                      onClick={() => handleSort('patient_name')}
                      style={{ border: '1px solid lightgrey', padding: '8px', cursor: 'pointer' }}
                    >
                      Patient Name{' '}
                      {sortConfig.key === 'patient_name'
                        ? sortConfig.direction === 'ascending'
                          ? '↑'
                          : '↓'
                        : ''}
                    </th>
                    <th
                      onClick={() => handleSort('follow_up_dates')}
                      style={{ border: '1px solid lightgrey', padding: '8px', cursor: 'pointer' }}
                    >
                      Follow-ups{' '}
                      {sortConfig.key === 'follow_up_dates'
                        ? sortConfig.direction === 'ascending'
                          ? '↑'
                          : '↓'
                        : ''}
                    </th>
                    <th
                      onClick={() => handleSort('discharged')}
                      style={{ border: '1px solid lightgrey', padding: '8px', cursor: 'pointer' }}
                    >
                      Discharged{' '}
                      {sortConfig.key === 'discharged'
                        ? sortConfig.direction === 'ascending'
                          ? '↑'
                          : '↓'
                        : ''}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEpisodes.map((episode) => (
                    <tr
                      key={episode.id}
                      onClick={() => handleRowClick(episode)}
                      style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid lightgrey',
                        backgroundColor: episode.discharge ? 'inherit' : '#fc7c7c',
                      }}
                    >
                      <td style={{ border: '1px solid lightgrey', padding: '8px' }}>
                        {new Date(episode.surgery_date).toLocaleDateString()}
                      </td>
                      <td style={{ border: '1px solid lightgrey', padding: '8px' }}>{episode.patient_name}</td>
                      <td style={{ border: '1px solid lightgrey', padding: '8px' }}>{episode.follow_up_dates.length}</td>
                      <td style={{ border: '1px solid lightgrey', padding: '8px' }}>
                        {episode.discharge ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <DashboardTextHeader>
                <h2>Your Episodes</h2>
              </DashboardTextHeader>
              <DashboardText>
                <p>You have not recorded any episodes yet.</p>
              </DashboardText>
            </div>
          )
        ) : (
          <DashboardText>Loading episodes...</DashboardText>
        )}
      </DashboardWrapper>
      <ButtonContainer isDesktop={isDesktop}>
        <Button
          buttonType="button"
          block
          filled
          size="md"
          onClick={() => history.push(urls.patients())}
        >
          Go to Patient Directory
        </Button>
      </ButtonContainer>
    </PageWrapper>
  );
};

export default LandingPage;
