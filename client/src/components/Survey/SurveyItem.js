import React from 'react';

const SurveyItem = ({ survey: { title, body, dateSent, yes, no } }) => (
  <div className="card darken-1">
    <div className="card-content ">
      <span className="card-title">{title}</span>
      <p>{body}</p>
      <p className="right">
        Send on: {new Date(dateSent).toLocaleDateString()}
      </p>
    </div>
    <div className="card-action">
      <span>
        Yes: <strong>{yes}</strong>{' '}
      </span>
      <span>
        No: <strong>{no}</strong>{' '}
      </span>
    </div>
  </div>
);

export default SurveyItem;
