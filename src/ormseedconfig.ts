import { DataSourceOptions } from 'typeorm';
import ormConfig from './ormconfig';

const ormSeedConfig: DataSourceOptions = {
  ...ormConfig,
  migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
};

export default ormSeedConfig;
