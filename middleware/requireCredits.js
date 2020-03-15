// Define and export a middleware function that checks if user
// has enough available credits
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits.' });
  }
  next();
};
