import { Router } from 'express';
// import auth from './routes/auth';
// import user from './routes/user';
import agendash from './routes/agendash';
import auth from './routes/auth/auth';
import keyword from './routes/keyword';
import movie from './routes/movie';
import review from './routes/review';
import user from './routes/user';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	keyword(app);
	movie(app);
	review(app);
	auth(app);
	user(app);
	// agendash(app);

	return app
}