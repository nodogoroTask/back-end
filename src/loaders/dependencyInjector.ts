import { Container } from 'typedi';
import {LocationRepository
} from '../repositories';
import LoggerInstance from './logger';

export default () => {
  try {
    Container.set('logger', LoggerInstance);
    LoggerInstance.info('✌️ logger injected into container');
    /**
     * Add data management repositories
     */
    Container.set('LocationRepository', new LocationRepository());
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
