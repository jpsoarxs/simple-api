import mongosse from 'mongoose';

require('dotenv/config');

// mongosse.connect(
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
// );


mongosse.connect(
  'mongodb+srv://admin:Simple258079@simplestore.efyb5.mongodb.net/ecommerce?retryWrites=true&w=majority',
  {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
  }
);

mongosse.Promise = global.Promise;

export default mongosse;
