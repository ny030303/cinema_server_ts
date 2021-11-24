import { Router } from 'express';
// import auth from './routes/auth';
// import user from './routes/user';
import agendash from './routes/agendash';
import keyword from './routes/keyword';
import movie from './routes/movie';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	keyword(app);
	movie(app);
	// auth(app);
	// user(app);
	// agendash(app);

	return app
}