/** @jsxImportSource @emotion/react */
import React, { FC } from 'react';

import { Button, Select, TextArea, TextField } from '@orfium/ictinus';
import { omit } from 'lodash';
import { Field, Form } from 'react-final-form';
import { useRouteMatch } from 'react-router-dom';

import { CheckBoxWrapper } from '../../../../../common.style';
import Checkbox from '../../../../../components/FormElements/Checkbox';
import { useDischarge } from '../../../../../hooks/api/patientHooks';
import { DischargeAPI, SelectOption } from '../../../../../models/apiTypes';
import {
  FormHeadingContainer,
  SelectWrapper,
} from '../../../../RegisterEpisode/components/RegisterEpisodeForm/RegisterEpisodeForm.style';
import { BOOLEAN_OPTIONS } from '../../../../RegisterEpisode/constants';
import { InternalContainer } from '../style';
import { FieldWrapper } from './style';

const POST_OPERATIVE_COMPLICATIONS = [
  { label: 'Bleeding' },
  { label: 'Haematoma' },
  { label: 'Urinary Retention' },
  { label: 'Return to theatre' },
  { label: 'Death' },
];

const Discharge: FC<{
  isOpen: boolean;
  discharge: DischargeAPI;
}> = ({ isOpen, discharge }) => {
  const match = useRouteMatch<{ episodeID: string }>();
  const { episodeID } = match.params;
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

  const canSubmit = discharge?.infection === undefined;

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
        initialValues={{
          ...discharge,
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
                          locked={!canSubmit}
                          label={'Date'}
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
                          <Select
                            locked={!canSubmit}
                            id="aware_of_mesh"
                            label="Antibiotics given on discharge"
                            styleType="outlined"
                            size="md"
                            required={canSubmit}
                            status={hasError ? 'error' : 'hint'}
                            hintMsg={hasError ? props.meta.error : undefined}
                            options={BOOLEAN_OPTIONS}
                            {...omit(props.input, ['onFocus'])}
                            selectedOption={
                              discharge?.aware_of_mesh !== undefined
                                ? BOOLEAN_OPTIONS.find((option) =>
                                    discharge?.aware_of_mesh
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
                            locked={!canSubmit}
                            label={'Duration (days)'}
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
                )}

                <FieldWrapper>
                  <label>Infection</label>
                  <CheckBoxWrapper>
                    {POST_OPERATIVE_COMPLICATIONS.map((option) => (
                      <div key={option.label}>
                        <Field
                          name={`infection`}
                          type="checkbox"
                          value={option.label}
                          label={option.label}
                          component={Checkbox}
                          disabled={!canSubmit}
                        />
                      </div>
                    ))}
                  </CheckBoxWrapper>
                </FieldWrapper>

                <FieldWrapper>
                  <label>Comments</label>
                  <Field name="comments" initialValue={discharge?.comments}>
                    {(props) => {
                      const hasError =
                        props.meta.touched && props.meta.invalid && !props.meta.active;
                      return (
                        <TextArea
                          id="comments"
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
