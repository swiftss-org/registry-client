/** @jsxImportSource @emotion/react */
import React, { FC, useMemo } from 'react';

import { Button, Icon, Select, TextArea, TextField } from '@orfium/ictinus';
import arrayMutators from 'final-form-arrays';
import { omit } from 'lodash';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useRouteMatch } from 'react-router-dom';

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
import { InternalContainer } from '../style';
import { FieldWrapper } from './style';

const FollowUps: FC<{
  isOpen: boolean;
  followUp: FollowUpAPI;
}> = ({ isOpen, followUp }) => {
  const match = useRouteMatch<{ episodeID: string }>();
  const { episodeID } = match.params;
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
                          locked={!canSubmit}
                          type={'date'}
                          label={'Date'}
                          required={canSubmit}
                          styleType="outlined"
                          size="md"
                          status={hasError ? 'error' : 'hint'}
                          hintMsg={hasError ? props.meta.error : undefined}
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
                                    <Select
                                      id="id"
                                      label="Surgeon"
                                      isSearchable={true}
                                      styleType="outlined"
                                      size="md"
                                      locked={!canSubmit}
                                      required={canSubmit}
                                      status={hasError ? 'error' : 'hint'}
                                      hintMsg={hasError ? props.meta.error : undefined}
                                      options={surgeonOptions}
                                      {...omit(props.input, ['onFocus'])}
                                      selectedOption={surgeonOptions.find(
                                        (option) => option.value === props.input.value.value
                                      )}
                                      handleSelectedOption={props.input.onChange}
                                    />
                                  </SelectWrapper>
                                  {index === 0 && canSubmit && (
                                    <Icon
                                      name={'plus'}
                                      size={24}
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
                        locked
                        styleType="outlined"
                        label={'Surgeon'}
                        size="md"
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
                          <Select
                            locked={!canSubmit}
                            id="pain_severity"
                            label="Pain Severity"
                            styleType="outlined"
                            size="md"
                            required={canSubmit}
                            status={hasError ? 'error' : 'hint'}
                            hintMsg={hasError ? props.meta.error : undefined}
                            options={FOLLOW_UP_PAIN_OPTIONS}
                            {...omit(props.input, ['onFocus'])}
                            selectedOption={FOLLOW_UP_PAIN_OPTIONS.find(
                              (option) => option.value === props.input.value.value
                            )}
                            handleSelectedOption={props.input.onChange}
                          />
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
                          <Select
                            id="mesh_awareness"
                            label="Mesh Awareness"
                            styleType="outlined"
                            size="md"
                            locked={!canSubmit}
                            required={canSubmit}
                            status={hasError ? 'error' : 'hint'}
                            hintMsg={hasError ? props.meta.error : undefined}
                            options={BOOLEAN_OPTIONS}
                            {...omit(props.input, ['onFocus'])}
                            selectedOption={BOOLEAN_OPTIONS.find(
                              (option) => option.value === props.input.value.value
                            )}
                            handleSelectedOption={props.input.onChange}
                          />
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
                          <Select
                            id="seroma"
                            label="Seroma"
                            styleType="outlined"
                            size="md"
                            locked={!canSubmit}
                            required={canSubmit}
                            status={hasError ? 'error' : 'hint'}
                            hintMsg={hasError ? props.meta.error : undefined}
                            options={BOOLEAN_OPTIONS}
                            {...omit(props.input, ['onFocus'])}
                            selectedOption={BOOLEAN_OPTIONS.find(
                              (option) => option.value === props.input.value.value
                            )}
                            handleSelectedOption={props.input.onChange}
                          />
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
                          <Select
                            id="infection"
                            label="Infection"
                            styleType="outlined"
                            size="md"
                            locked={!canSubmit}
                            required={canSubmit}
                            status={hasError ? 'error' : 'hint'}
                            hintMsg={hasError ? props.meta.error : undefined}
                            options={BOOLEAN_OPTIONS}
                            {...omit(props.input, ['onFocus'])}
                            selectedOption={BOOLEAN_OPTIONS.find(
                              (option) => option.value === props.input.value.value
                            )}
                            handleSelectedOption={props.input.onChange}
                          />
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
                          <Select
                            locked={!canSubmit}
                            id="numbness"
                            label="Numbness"
                            styleType="outlined"
                            size="md"
                            required={canSubmit}
                            status={hasError ? 'error' : 'hint'}
                            hintMsg={hasError ? props.meta.error : undefined}
                            options={BOOLEAN_OPTIONS}
                            {...omit(props.input, ['onFocus'])}
                            selectedOption={BOOLEAN_OPTIONS.find(
                              (option) => option.value === props.input.value.value
                            )}
                            handleSelectedOption={props.input.onChange}
                          />
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
                          <Select
                            locked={!canSubmit}
                            id="further_surgery_need"
                            label="Need for further surgery?"
                            styleType="outlined"
                            size="md"
                            required={canSubmit}
                            status={hasError ? 'error' : 'hint'}
                            hintMsg={hasError ? props.meta.error : undefined}
                            options={BOOLEAN_OPTIONS}
                            {...omit(props.input, ['onFocus'])}
                            selectedOption={
                              followUp?.further_surgery_need !== undefined
                                ? BOOLEAN_OPTIONS.find((option) =>
                                    followUp?.further_surgery_need
                                      ? option.label === 'Yes'
                                      : option.label === 'No'
                                  )
                                : BOOLEAN_OPTIONS.find(
                                    (option) => option.value === props.input.value.value
                                  )
                            }
                            handleSelectedOption={props.input.onChange}
                          />
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
                        <TextArea
                          id="surgery_comments_box"
                          required={canSubmit}
                          styleType="outlined"
                          status={hasError ? 'error' : 'hint'}
                          hintMsg={hasError ? props.meta.error : undefined}
                          disabled={!canSubmit}
                          {...props.input}
                        />
                      );
                    }}
                  </Field>
                </FieldWrapper>
                <Button
                  color={'blue-200'}
                  buttonType="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !canSubmit || isSurgeonsLoading}
                  block
                  size="md"
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
