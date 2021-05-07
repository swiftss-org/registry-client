import { Breadcrumb, Button, CheckBox, Radio, RadioGroup, TextField } from '@orfium/ictinus';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PageWrapper } from './HelloPage.style';

const HelloPage: React.FC = () => {
  const [checked, setChecked] = useState(true);
  return (
    <PageWrapper>
      <Router>
        <Breadcrumb
          data={[
            {
              to: '/first-level',
              label: 'First Level',
            },
            {
              to: '/second-level',
              label: 'Second Level',
            },
            {
              to: '/third-level',
              label: 'Third Level',
            },
            {
              to: '/forth-level',
              label: 'Forth Level',
            },
            {
              to: '',
              label: 'Fifth Level',
              options: ['ITEM 1', 'ITEM 2'],
              onChangeHandler: (text) => text && alert(text),
            },
          ]}
        />
        <div>Hello Orfium</div>
        <Switch>
          <Route path="/first-level">
            {() => <Button type="branded1">This is a button</Button>}
          </Route>
          <Route path="/second-level">
            {() => (
              <CheckBox
                onClick={() => setChecked((prev) => !prev)}
                checked={checked}
                label={`${checked ? 'Checked' : 'Not checked'} Single`}
              />
            )}
          </Route>
          <Route path="/third-level">
            {() => (
              <RadioGroup defaultValue="b" name="group">
                <Radio value="a" />
                <Radio value="b" />
                <Radio value="c" />
              </RadioGroup>
            )}
          </Route>
          <Route path="/forth-level">{() => <TextField label={'Label'} />}</Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
};

export default HelloPage;
