import { DataSource } from 'typeorm';
import ormConfig from './ormconfig';

export default new DataSource(ormConfig);
