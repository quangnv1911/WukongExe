import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
config();


const app = express();
app.use('/public',express.static('public'));
const PORT = process.env.PORT || 3007;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connect to MongoDB success");
    app.use(cors());


    app.use(bodyParser.json({limit: '10mb'}));
    routes(app);


    app.listen(PORT, () => {
      console.log('Bearpo running on port ' + PORT);
    })
  } catch(err) {
    console.log(err);
  }
}

main();