import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const MONGODB_URL = 'mongodb://sally:sally728@cluster0-shard-00-00.0v9qy.mongodb.net:27017,cluster0-shard-00-01.0v9qy.mongodb.net:27017,cluster0-shard-00-02.0v9qy.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-w3h27x-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);