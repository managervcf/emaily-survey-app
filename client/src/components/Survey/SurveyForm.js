import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

const SurveyForm = ({ handleSubmit, setShowReview }) => {
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
    <form onSubmit={handleSubmit(() => setShowReview(true))}>
      {renderFields(formFields)}
      <Link to="/surveys" className="red darken-1 btn-flat white-text">
        Cancel
      </Link>
      <button
        type="submit"
        className="green darken-1 btn-flat white-text right"
      >
        Next
      </button>
    </form>
  );
};

const validate = values => {
  // Create error object
  const errors = {};

  // Validate email addresses
  errors.recipients = validateEmails(values.recipients || '');

  // Validate empty fields
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: false,
  validate
})(SurveyForm);
