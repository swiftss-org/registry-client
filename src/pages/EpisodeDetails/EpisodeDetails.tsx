/** @jsxImportSource @emotion/react */
import React from 'react';

import { Icon } from '@orfium/ictinus';
import { IconWrapper } from 'App.style';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { PageTitle } from '../../common.style';
import {
  useGetEpisode,
  useGetEpisodeDischarge,
  useGetEpisodeFollowUps,
} from '../../hooks/api/patientHooks';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';
import urls from '../../routing/urls';
import {
  Heading,
  Subheading,
  TextWrapper,
} from '../PatientDetails/components/EpisodeList/EpisodeCard/EpisodeCard.style';
import ExpandableContainer from './components/ExpandableContainer';
import Discharge from './components/ExpandableContainer/components/Discharge';
import FollowUps from './components/ExpandableContainer/components/FollowUps';
import Surgery from './components/ExpandableContainer/components/Surgery';
import { Container, PageWrapper } from './EpisodeDetails.style';

const EpisodeDetails: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  const history = useHistory();
  const match = useRouteMatch<{ hospitalID: string; patientID: string; episodeID: string }>();
  const { hospitalID, patientID, episodeID } = match.params;

  const { data: episode } = useGetEpisode(episodeID);
  const { data: followUps } = useGetEpisodeFollowUps(episodeID);
  const { data: discharge } = useGetEpisodeDischarge(episodeID);

  return (
    <PageWrapper isDesktop={isDesktop}>
      <PageTitle>
        <IconWrapper>
          <Icon
            name="fatArrowLeft"
            size={24}
            color={'lightGray-700'}
            onClick={() => {
              history.replace(`${urls.patients()}/${hospitalID}/${patientID}`);
            }}
          />
        </IconWrapper>
        Episode Details
      </PageTitle>
      {episode && (
        <Container>
          <TextWrapper>
            <Heading>{episode.episode_type}</Heading>
            <Subheading>{episode.surgery_date}</Subheading>
          </TextWrapper>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*// @ts-ignore*/}
          <ExpandableContainer isDone title={'Surgery'} component={Surgery} episode={episode} />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*// @ts-ignore*/}
          <ExpandableContainer
            isDone={discharge?.infection !== undefined}
            title={'Discharge'}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /*// @ts-ignore*/
            component={Discharge}
            discharge={discharge}
          />

          {followUps?.map((followUp, index) => (
            <ExpandableContainer
              key={`follow_up_${index}`}
              title={'Follow Up'}
              isDone
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /*// @ts-ignore*/
              component={FollowUps}
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /*// @ts-ignore*/
              followUp={followUp}
            />
          ))}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*// @ts-ignore*/}
          <ExpandableContainer isDone={false} title={'Follow Up'} component={FollowUps} />
        </Container>
      )}
    </PageWrapper>
  );
};

export default EpisodeDetails;
