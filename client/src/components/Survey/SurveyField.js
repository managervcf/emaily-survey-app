import React from 'react';

const SurveyField = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>
        {label}
        <span className="red-text right"> {touched && error}</span>
      </label>
      <input {...input} style={{ marginBottom: '5px'}}></input>
    </div>
  );
};

export default SurveyField;
