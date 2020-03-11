import React, { useState } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);

  return showReview ? (
    <SurveyFormReview setShowReview={setShowReview} />
  ) : (
    <SurveyForm setShowReview={setShowReview} />
  );
};

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
