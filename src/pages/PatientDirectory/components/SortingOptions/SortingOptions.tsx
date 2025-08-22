/** @jsxImportSource @emotion/react */
import React from 'react';

import { Radio, RadioGroup } from '@mui/material';
import { Portal } from 'components/Portal';
import SlidingWindow from 'components/SlidingWindow';
import { SortingOptionsType } from 'pages/PatientDirectory/types';

import { Container, RadioGroupContainer, RadioWithLabel, Title } from './SortingOptions.style';

type Props = {
  title: string;
  sortingOption: SortingOptionsType;
  onSortingOptionChange: (option: SortingOptionsType) => void;
  onClose: () => void;
};

const SortingOptions: React.FC<Props> = ({
  title,
  onClose,
  sortingOption,
  onSortingOptionChange,
}) => {
  return (
    <Portal baseComponent={SlidingWindow} onClose={onClose} title={title}>
      <Container>
        <RadioGroup
          value={sortingOption}
          name="sortingOptions"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSortingOptionChange(e.target.value as SortingOptionsType)
          }
        >
          <RadioGroupContainer>
            <Title>Name:</Title>
            <RadioWithLabel>
              <Radio value="full_name" />
              <div>Name A-Z</div>
            </RadioWithLabel>
            <RadioWithLabel>
              <Radio value="-full_name" />
              <div>Name Z-A</div>
            </RadioWithLabel>
          </RadioGroupContainer>

          <RadioGroupContainer>
            <Title>Date:</Title>
            <RadioWithLabel>
              <Radio value="-created_at" />
              <div>Newest to oldest</div>
            </RadioWithLabel>
            <RadioWithLabel>
              <Radio value="created_at" />
              <div>Oldest to newest</div>
            </RadioWithLabel>
          </RadioGroupContainer>
        </RadioGroup>
      </Container>
    </Portal>
  );
};

export default SortingOptions;
