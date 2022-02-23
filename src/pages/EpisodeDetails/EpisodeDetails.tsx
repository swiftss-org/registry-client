/** @jsxImportSource @emotion/react */
import React from 'react';

import { Icon } from '@orfium/ictinus';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { PageTitle } from '../../common.style';
import { useGetEpisode, useGetEpisodeDischarge } from '../../hooks/api/patientHooks';
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

// type Props = {};

const EpisodeDetails: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch<{ hospitalID: string; patientID: string; episodeID: string }>();
  const { hospitalID, patientID, episodeID } = match.params;

  const { data: episode } = useGetEpisode(episodeID);
  // const { data: followUps } = useGetEpisodeFollowUps(episodeID);
  const { data: discharge } = useGetEpisodeDischarge(episodeID);

  return (
    <PageWrapper>
      <PageTitle>
        <Icon
          name="fatArrowLeft"
          size={24}
          color={'lightGray-700'}
          onClick={() => {
            history.replace(`${urls.patients()}/${hospitalID}/${patientID}`);
          }}
        />
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
          <ExpandableContainer title={'Surgery'} component={Surgery} episode={episode} />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*// @ts-ignore*/}
          <ExpandableContainer title={'Discharge'} component={Discharge} discharge={discharge} />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*// @ts-ignore*/}
          <ExpandableContainer title={'Follow Up'} component={FollowUps} />
        </Container>
      )}
    </PageWrapper>
  );
};

export default EpisodeDetails;
