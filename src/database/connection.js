import mongosse from 'mongoose';

require('dotenv/config');

mongosse.connect(
  'mongodb+srv://admin:Simple258079@simplestore.efyb5.mongodb.net/ecommerce?retryWrites=true&w=majority',
  {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
  }
);

mongosse.Promise = global.Promise;

export default mongosse;
