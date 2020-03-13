const { redirectDomain } = require('../../config/keys');

module.exports = ({ body, id }) => /*html*/ `
  <html>
    <body>
      <div style="text-align: center">
        <h3>We would love your feedback</h3>
        <p>Please answer the following question:</p>
        <p>${body}</p>
        <div>
          <a href="${redirectDomain}/api/surveys/${id}/yes">Yes</a>
        </div>
        <div>
          <a href="${redirectDomain}/api/surveys/${id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
`;
