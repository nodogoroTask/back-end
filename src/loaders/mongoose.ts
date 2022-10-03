import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (databaseName: string): Promise<Db> => {
  const databaseURL = config.databaseBaseURL + databaseName;
  const connection = await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  return connection.connection.db;
};
