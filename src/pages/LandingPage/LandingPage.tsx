import React, { useState } from 'react';

import { Button } from '@orfium/ictinus';
import { useGetSurgeonEpisodeSummary, useGetOwnedEpisodes } from 'hooks/api/patientHooks';
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

  return (
    <PageWrapper isDesktop={isDesktop}>
      <PageTitle>
        Surgeon Dashboard
      </PageTitle>
      <DashboardWrapper>
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
