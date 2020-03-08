import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [isReview, setIsReview] = useState(false);

  return isReview ? <SurveyFormReview /> : <SurveyForm />;
};

export default SurveyNew;
