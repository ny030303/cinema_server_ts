import { Container } from 'typedi';
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
import LoggerInstance from './logger';
// import 
// import agendaFactory from './agenda';
import config from '../config';

export default ({ seqInstance, models }: { seqInstance; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });
    LoggerInstance.info('🔧 Sequelize Instance injected into container');
    Container.set('sequelizeInstance', seqInstance);   
    // const agendaInstance = agendaFactory({ mongoConnection });
    // const mgInstance = new Mailgun(formData);


    // Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);
    // Container.set('emailClient', mgInstance.client({ key: config.emails.apiKey, username: config.emails.apiUsername }));
    // Container.set('emailDomain', config.emails.domain);

    LoggerInstance.info('🔧 Model, logger injected into container');

    // return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};