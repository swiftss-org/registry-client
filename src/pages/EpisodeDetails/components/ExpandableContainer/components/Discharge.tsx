/** @jsxImportSource @emotion/react */
import React, { FC } from 'react';

import { Button, Select, TextField } from '@orfium/ictinus';
import { omit } from 'lodash';
import { Field, Form } from 'react-final-form';
import { useRouteMatch } from 'react-router-dom';

import { useDischarge } from '../../../../../hooks/api/patientHooks';
import { DischargeAPI, DischargeForm } from '../../../../../models/apiTypes';
import {
  FormHeadingContainer,
  SelectWrapper,
} from '../../../../RegisterEpisode/components/RegisterEpisodeForm/RegisterEpisodeForm.style';
import { BOOLEAN_OPTIONS } from '../../../../RegisterEpisode/constants';
import { InternalContainer } from '../style';
import { FieldWrapper } from './style';

const Discharge: FC<{
  isOpen: boolean;
  discharge: DischargeAPI;
}> = ({ isOpen, discharge }) => {
  const match = useRouteMatch<{ episodeID: string }>();
  const { episodeID } = match.params;
  const { mutate, isLoading } = useDischarge(episodeID);

  const handleSubmit = (form: DischargeForm) => {
    mutate(form);
  };

  const canSubmit = discharge?.infection === undefined;

  return (
    <InternalContainer isOpen={isOpen} aria-expanded={isOpen}>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit }) => {
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
                          locked={!canSubmit}
                          type={'date'}
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

                <FieldWrapper>
                  <Field
                    name="aware_of_mesh"
                    initialValue={BOOLEAN_OPTIONS.find((option) =>
                      discharge?.aware_of_mesh ? option.label === 'Yes' : option.label === 'No'
                    )}
                  >
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;

                      return (
                        <SelectWrapper>
                          <Select
                            locked={!canSubmit}
                            id="aware_of_mesh"
                            label="Mesh"
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
                    name="infection"
                    initialValue={BOOLEAN_OPTIONS.find((option) =>
                      discharge?.infection ? option.label === 'Yes' : option.label === 'No'
                    )}
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

                <Button
                  color={'blue-200'}
                  buttonType="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !canSubmit}
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

export default Discharge;
