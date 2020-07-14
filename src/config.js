port = process.env.PORT || 5000;
JwtSecret = 'B747865D48A8216B11F23F4E9358B';
mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/holzkorb';

module.exports = {
  port,
  JwtSecret,
  mongoURI,
};
