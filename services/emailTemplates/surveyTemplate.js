const { redirectDomain } = require('../../config/keys');

module.exports = question => /*html*/ `
  <html>
    <body>
      <div style="text-align: center">
        <h3>We would love your feedback</h3>
        <p>Please answer the following question:</p>
        <p>${question}</p>
        <div>
          <a href="${redirectDomain}">Yes</a>
        </div>
        <div>
          <a href="${redirectDomain}">No</a>
        </div>
      </div>
    </body>
  </html>
`;
