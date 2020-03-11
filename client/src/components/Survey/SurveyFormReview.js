import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../actions';
import formFields from './fromFields';

const SurveyFormReview = ({ setShowReview, formValues, submitSurvey }) => {
  // Access history object
  let history = useHistory();

  // Build review fields
  let reviewFields = formFields.map(({ label, name }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm these entries</h5>
      <div>{reviewFields}</div>
      <button
        className="yellow darken-3 btn-flat white-text left"
        onClick={() => setShowReview(false)}
      >
        Back
      </button>
      <button
        className="green darken-1 btn-flat white-text right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
      </button>
    </div>
  );
};

const mapStateToProps = state => ({ formValues: state.form.surveyForm.values });

export default connect(mapStateToProps, actions)(SurveyFormReview);
