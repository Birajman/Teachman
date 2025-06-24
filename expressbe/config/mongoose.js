const mongoose = require('mongoose');
const db_url = 'mongodb://127.0.0.1:27017';
const db_name = "Teachman"


let con_url = db_url + '/' + db_name;

mongoose.connect(con_url)
  .then(() => {
    console.log('DB Connection Established Successfully.');
  })
  .catch((err) => {
    console.log('Error Connecting db URL!', err);
  });