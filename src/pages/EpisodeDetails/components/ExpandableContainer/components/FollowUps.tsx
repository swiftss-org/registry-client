/** @jsxImportSource @emotion/react */
import React, { FC, useMemo } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Select, TextField, TextareaAutosize, FormControl, FormHelperText, MenuItem } from '@mui/material';
import arrayMutators from 'final-form-arrays';
import { omit } from 'lodash';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useParams } from 'react-router-dom';

import { useFollowUp, useGetSurgeons } from '../../../../../hooks/api/patientHooks';
import { FollowUpAPI, FollowUpForm } from '../../../../../models/apiTypes';
import { EMPTY_ARRAY } from '../../../../RegisterEpisode/components/RegisterEpisodeForm/RegisterEpisodeForm';
import {
  ArrayContainer,
  FormHeadingContainer,
  SelectWrapper,
} from '../../../../RegisterEpisode/components/RegisterEpisodeForm/RegisterEpisodeForm.style';
import { BOOLEAN_OPTIONS, FOLLOW_UP_PAIN_OPTIONS } from '../../../../RegisterEpisode/constants';
import { getSurgeonOptionsSorted } from '../../../../RegisterEpisode/utils';
import { followUpFormValidation } from '../../../utils';
import { InternalContainer } from '../style';
import { FieldWrapper } from './style';

const FollowUps: FC<{
  isOpen: boolean;
  followUp: FollowUpAPI;
  values: FollowUpForm;
}> = ({ isOpen, followUp }) => {
  const { episodeID } = useParams<{ episodeID: string }>();
  if (!episodeID) {
    throw new Error('Episode ID is missing');
  }
  const { mutate, isLoading } = useFollowUp(episodeID);

  const { data: surgeons, isLoading: isSurgeonsLoading } = useGetSurgeons({
    offset: 0,
    limit: 100,
  });

  const surgeonOptions = useMemo(() => getSurgeonOptionsSorted(surgeons?.results ?? []), [surgeons]);

  const handleSubmit = (form: FollowUpForm) => {
    mutate(form);
  };
  const canSubmit = followUp?.infection === undefined;

  return (
    <InternalContainer isOpen={isOpen} aria-expanded={isOpen}>
      <Form
        mutators={{
          ...arrayMutators,
        }}
        validate={(values) => followUpFormValidation(values)}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          form: {
            mutators: { push: addField },
          },
        }) => {
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
                  <Field name="date" initialValue={followUp?.date} parse={(value) => value}>
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;
                      return (
                        <TextField
                          id="date"
                          disabled={!canSubmit}
                          type={'date'}
                          label={'Date'}
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
                {canSubmit ? (
                  <FieldArray name={'attendees'} initialValue={EMPTY_ARRAY}>
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <FieldWrapper key={name}>
                          <Field name={`${name}`}>
                            {(props) => {
                              const hasError =
                                props.meta.touched && props.meta.invalid && !props.meta.active;

                              return (
                                <ArrayContainer>
                                  <SelectWrapper>
                                    <FormControl fullWidth error={hasError}>
                                      <Select
                                        id="id"
                                        label="Surgeon"
                                        variant="outlined"
                                        size="medium"
                                        disabled={!canSubmit}
                                        required={canSubmit}
                                        error={hasError}
                                        {...omit(props.input, ['onFocus'])}
                                        value={props.input.value.value}
                                        onChange={props.input.onChange}
                                      >
                                        {surgeonOptions.map((option) => (
                                          <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      {hasError && <FormHelperText>{props.meta.error}</FormHelperText>}
                                    </FormControl>
                                  </SelectWrapper>
                                  {index === 0 && canSubmit && (
                                    <AddCircleOutlineIcon
                                      onClick={() => addField('attendees', undefined)}
                                    />
                                  )}
                                </ArrayContainer>
                              );
                            }}
                          </Field>
                        </FieldWrapper>
                      ))
                    }
                  </FieldArray>
                ) : (
                  followUp?.attendees.map((attendee, index) => (
                    <FieldWrapper key={`attendee_fetched_${index}`}>
                      <TextField
                        disabled
                        variant="outlined"
                        label={'Surgeon'}
                        size="medium"
                        value={`${attendee.user.first_name} ${attendee.user.last_name}`}
                      />
                    </FieldWrapper>
                  ))
                )}
                <FieldWrapper>
                  <Field
                    name="pain_severity"
                    initialValue={FOLLOW_UP_PAIN_OPTIONS.find(
                      (option) => followUp?.pain_severity === option.label
                    )}
                  >
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;
                      return (
                        <SelectWrapper>
                          <FormControl fullWidth error={hasError}>
                            <Select
                              disabled={!canSubmit}
                              id="pain_severity"
                              label="Pain Severity"
                              variant="outlined"
                              size="medium"
                              required={canSubmit}
                              error={hasError}
                              {...omit(props.input, ['onFocus'])}
                              value={props.input.value.value}
                              onChange={props.input.onChange}
                            >
                              {FOLLOW_UP_PAIN_OPTIONS.map((option) => (
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
                <FieldWrapper>
                  <Field
                    name="mesh_awareness"
                    initialValue={
                      followUp?.mesh_awareness !== undefined
                        ? BOOLEAN_OPTIONS.find((option) =>
                            followUp?.mesh_awareness
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
                              id="mesh_awareness"
                              label="Mesh Awareness"
                              variant="outlined"
                              size="medium"
                              disabled={!canSubmit}
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
                <FieldWrapper>
                  <Field
                    name="seroma"
                    initialValue={
                      followUp?.seroma !== undefined
                        ? BOOLEAN_OPTIONS.find((option) =>
                            followUp?.seroma ? option.label === 'Yes' : option.label === 'No'
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
                              id="seroma"
                              label="Seroma"
                              variant="outlined"
                              size="medium"
                              disabled={!canSubmit}
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
                </FieldWrapper>{' '}
                <FieldWrapper>
                  <Field
                    name="infection"
                    initialValue={
                      followUp?.infection !== undefined
                        ? BOOLEAN_OPTIONS.find((option) =>
                            followUp?.infection ? option.label === 'Yes' : option.label === 'No'
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
                              id="infection"
                              label="Infection"
                              variant="outlined"
                              size="medium"
                              disabled={!canSubmit}
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
                <FieldWrapper>
                  <Field
                    name="numbness"
                    initialValue={
                      followUp?.numbness !== undefined
                        ? BOOLEAN_OPTIONS.find((option) =>
                            followUp?.numbness ? option.label === 'Yes' : option.label === 'No'
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
                              id="numbness"
                              label="Numbness"
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
                <FieldWrapper>
                  <Field
                    name="recurrence"
                    initialValue={
                      followUp?.recurrence != null
                        ? BOOLEAN_OPTIONS.find((option) =>
                            followUp?.recurrence ? option.label === 'Yes' : option.label === 'No'
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
                              id="recurrence"
                              label="Recurrence"
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
                <FieldWrapper>
                  <Field
                    name="further_surgery_need"
                    initialValue={
                      followUp?.further_surgery_need !== undefined
                        ? BOOLEAN_OPTIONS.find((option) =>
                            followUp?.further_surgery_need
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
                              id="further_surgery_need"
                              label="Need for further surgery?"
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
                <FieldWrapper>
                  <label>Comments</label>
                  <Field name="surgery_comments_box" initialValue={followUp?.surgery_comments_box}>
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;
                      return (
                        <FormControl fullWidth error={hasError}>
                          <TextareaAutosize
                            id="surgery_comments_box"
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
                  disabled={isLoading || isSurgeonsLoading}
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

export default FollowUps;
