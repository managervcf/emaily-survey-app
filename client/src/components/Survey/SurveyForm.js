import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

// List if fields
const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
];

const SurveyForm = ({ handleSubmit }) => {
  // Generate fields
  const renderFields = array =>
    array.map(({ label, name }) => (
      <Field
        key={name}
        label={label}
        name={name}
        component={SurveyField}
        type="text"
      />
    ));

  return (
    <form onSubmit={handleSubmit(values => console.log(values))}>
      {renderFields(FIELDS)}
      <Link to="/surveys" className="red btn-flat white-text">
        Cancel
      </Link>
      <button type="submit" className="teal btn-flat white-text right">
        Next
      </button>
    </form>
  );
};

const validate = values => {
  // Create error object
  const errors = {};

  // Validate email addresses
  errors.emails = validateEmails(values.emails || '');

  // Validate empty fields
  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`;
    }
  });

  return errors;
};

export default reduxForm({ form: 'surveyForm', validate })(SurveyForm);
