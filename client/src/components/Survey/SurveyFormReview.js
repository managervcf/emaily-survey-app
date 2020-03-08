import React from 'react';
import { reduxForm } from 'redux-form';

const SurveyFormReview = () => <div>review</div>;

export default reduxForm({ form: 'surveyForm' })(SurveyFormReview);
