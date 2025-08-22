/** @jsxImportSource @emotion/react */
import React, { FC } from 'react';

import { Button, TextField, Select, TextareaAutosize, FormControl, FormHelperText, MenuItem } from '@mui/material';
import { omit } from 'lodash';
import { Field, Form } from 'react-final-form';
import { useParams } from 'react-router-dom';

import { CheckBoxWrapper } from '../../../../../common.style';
import Checkbox from '../../../../../components/FormElements/Checkbox';
import { useDischarge } from '../../../../../hooks/api/patientHooks';
import { DischargeAPI, SelectOption } from '../../../../../models/apiTypes';
import {
  FormHeadingContainer,
  SelectWrapper,
} from '../../../../RegisterEpisode/components/RegisterEpisodeForm/RegisterEpisodeForm.style';
import { BOOLEAN_OPTIONS } from '../../../../RegisterEpisode/constants';
import { dischargeFormValidation } from '../../../utils';
import { InternalContainer } from '../style';
import { FieldWrapper } from './style';

const POST_OPERATIVE_COMPLICATIONS = [
  { label: 'None' },
  { label: 'Bleeding' },
  { label: 'Haematoma' },
  { label: 'Urinary Retention' },
  { label: 'Return to theatre' },
  { label: 'Death' }
];

const Discharge: FC<{
  isOpen: boolean;
  discharge: DischargeAPI;
}> = ({ isOpen, discharge }) => {
  const { episodeID } = useParams<{ episodeID: string }>();
  if (!episodeID) {
    throw new Error('Episode ID is missing');
  }
  const { mutate, isLoading } = useDischarge(episodeID);

  const handleSubmit = (form: {
    date: string;
    aware_of_mesh: SelectOption;
    infection: string;
    episode_id: number;
    comments?: string;
    discharge_duration?: string;
  }) => {
    mutate(form);
  };

  const canSubmit = discharge?.infection == undefined;

  return (
    <InternalContainer isOpen={isOpen} aria-expanded={isOpen}>
      <Form
        onSubmit={(values) => {
          const newValues = {
            ...values,
            infection: (values.infection ? values.infection.join(',') : 'none') as string,
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          handleSubmit(newValues);
        }}
        validate={(values) => {
          const newValues = {
            ...values,
            infection: (values.infection ? values.infection.join(',') : 'none') as string,
          };
          return dischargeFormValidation(newValues);
        }}
        initialValues={{
          ...discharge,
          aware_of_mesh: discharge?.aware_of_mesh !== undefined
            ? BOOLEAN_OPTIONS.find((option) =>
                discharge?.aware_of_mesh ? option.label === 'Yes' : option.label === 'No'
              )
            : undefined,
          infection: discharge && discharge.infection ? discharge.infection?.split(',') : undefined,
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <form
              onSubmit={handleSubmit}
              css={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <FormHeadingContainer>
                <FieldWrapper>
                  <Field name="date" initialValue={discharge?.date} parse={(value) => value}>
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;
                      return (
                        <TextField
                          id="date"
                          disabled={!canSubmit}
                          label={'Date'}
                          type={'date'}
                          required={canSubmit}
                          variant="outlined"
                          size="medium"
                          error={hasError}
                          helperText={hasError ? props.meta.error : undefined}
                          {...props.input}
                        />
                      );
                    }}
                  </Field>
                </FieldWrapper>

                <FieldWrapper>
                  <Field
                    name="aware_of_mesh"
                    initialValue={
                      discharge?.aware_of_mesh !== undefined
                        ? BOOLEAN_OPTIONS.find((option) =>
                            discharge?.aware_of_mesh
                              ? option.label === 'Yes'
                              : option.label === 'No'
                          )
                        : undefined
                    }
                  >
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;

                      return (
                        <SelectWrapper>
                          <FormControl fullWidth error={hasError}>
                            <Select
                              disabled={!canSubmit}
                              id="aware_of_mesh"
                              label="Antibiotics given on discharge"
                              variant="outlined"
                              size="medium"
                              required={canSubmit}
                              error={hasError}
                              {...omit(props.input, ['onFocus'])}
                              value={props.input.value.value}
                              onChange={props.input.onChange}
                            >
                              {BOOLEAN_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {hasError && <FormHelperText>{props.meta.error}</FormHelperText>}
                          </FormControl>
                        </SelectWrapper>
                      );
                    }}
                  </Field>
                </FieldWrapper>

                {values?.aware_of_mesh?.value === 0 && (
                  <FieldWrapper>
                    <Field
                      name="discharge_duration"
                      initialValue={discharge?.discharge_duration}
                      parse={(value) => value}
                    >
                      {(props) => {
                        const hasError =
                          props.meta.touched && props.meta.invalid && !props.meta.active;
                        return (
                          <TextField
                            id="discharge_duration"
                            disabled={!canSubmit}
                            label={'Duration (days)'}
                            required={canSubmit}
                            variant="outlined"
                            size="medium"
                            error={hasError}
                            helperText={hasError ? props.meta.error : undefined}
                            {...props.input}
                          />
                        );
                      }}
                    </Field>
                  </FieldWrapper>
                )}

                <FieldWrapper>
                  <label>Post-operative complications</label>
                  <CheckBoxWrapper>
                    {POST_OPERATIVE_COMPLICATIONS.map((option) => (
                      <div key={option.label}>
                        <Field
                          name={`infection`}
                          type="checkbox"
                          value={option.label}
                          label={option.label}
                          component={Checkbox}
                          required={canSubmit}
                          disabled={!canSubmit}
                        />
                      </div>
                    ))}
                  </CheckBoxWrapper>
                  <Field
                    name="infection"
                    initialValue={discharge?.infection}
                    parse={(value) => value}
                  >
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;
                      return (
                        <TextField
                          id="infection"
                          disabled
                          label={'Post-operative complications'}
                          required={canSubmit}
                          variant="outlined"
                          size="medium"
                          error={hasError}
                          helperText={hasError ? props.meta.error : undefined}
                          {...props.input}
                        />
                      );
                    }}
                  </Field>
                </FieldWrapper>

                <FieldWrapper>
                  <label>Comments</label>
                  <Field name="comments" initialValue={discharge?.comments}>
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;
                      return (
                        <FormControl fullWidth error={hasError}>
                          <TextareaAutosize
                            id="comments"
                            minRows={3}
                            placeholder="Comments"
                            required={canSubmit}
                            disabled={!canSubmit}
                            {...props.input}
                          />
                          {hasError && <FormHelperText>{props.meta.error}</FormHelperText>}
                        </FormControl>
                      );
                    }}
                  </Field>
                </FieldWrapper>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  fullWidth
                  size="medium"
                >
                  Save changes
                </Button>
              </FormHeadingContainer>
            </form>
          );
        }}
      </Form>
    </InternalContainer>
  );
};

export default Discharge;
