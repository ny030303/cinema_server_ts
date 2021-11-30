import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);
  
  route.get('/me', middlewares.attachCurrentUser, (req:any, res) => {
    // console.log("in")
    // return res.status(200);
    return res.json({ user: req.currentUser }).status(200);
  });
};