import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SurveyItem from './SurveyItem';

import * as actions from '../../actions';

const SurveyList = ({ surveys, fetchSurveys }) => {
  // Fetch list of surveys
  useEffect(() => {
    // Create an async funciton that is called immidiately
    const fetchData = async () => await fetchSurveys();
    fetchData();
  }, [fetchSurveys]);

  console.log(surveys);

  return (
    <div>
      {surveys.reverse().map(({ _id, ...survey }) => (
        <SurveyItem key={_id} survey={survey} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(mapStateToProps, actions)(SurveyList);
