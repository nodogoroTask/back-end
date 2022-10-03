import expressLoader from './express';
import express from 'express';
import { Container } from 'typedi';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';
import { Logger } from 'winston';
import config from '../config';

export const appLoader = ({ app }: { app: express.Application }) => {
  dependencyInjectorLoader();
  const logger: Logger = Container.get('logger');
  logger.info('✌️ Dependency Injector loaded');
  expressLoader({ app });
  logger.info('✌️ Express loaded');
};

export const mainDatabaseStartConnection = async () => {
  const logger: Logger = Container.get('logger');
  await mongooseLoader(config.databaseName);
  logger.info('✌️ DB loaded and connected!');
};

export const startDatabaseConnection = async (databaseName: string) => {
  const logger: Logger = Container.get('logger');
  await mongooseLoader(databaseName);
  logger.info('✌️ DB loaded and connected!');
};
