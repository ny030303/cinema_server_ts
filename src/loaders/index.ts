import expressLoader from './express';
import mysqlLoader from './mysql';
import sequelizeLoader from './sequelize';
import dependencyInjectorLoader from './dependencyInjector';
// import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  // const mysqlConnection = await mysqlLoader();
  const sequelizeModels = sequelizeLoader();
  Logger.info('📖 sequelize loaded and connected!');

  const agenda = await dependencyInjectorLoader(sequelizeModels);
  Logger.info('📖 Dependency Injector loaded');

  // await jobsLoader({ agenda });
  // Logger.info(' 📖 Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('📖 Express loaded');
};