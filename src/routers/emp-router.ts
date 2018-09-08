import { Request, Response } from 'express';
import express from 'express';
import * as empDao from '../dao/emp-dao';

export const empRouter = express.Router();

empRouter.post('', async (req: Request, resp: Response) => {
  console.log('creating employee')
  try {
    const id = await empDao.createEmployee(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/logout', async (req: Request, resp: Response) => {
  try {
    if (req.session) {
      req.session.destroy;
      resp.redirect('/');
    }
  } catch (err) {
    resp.status(500);
  }
})
empRouter.post('/tickets/lodging', async (req, resp) => {
  try {
    const user = req.session.user;
    const id = await empDao.createLodgingTicket(req.body, user.id);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/tickets/travel', async (req, resp) => {
  try {
    const user = req.session.user
    const id = await empDao.createTravelTicket(req.body, user.id);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/tickets/food', async (req, resp) => {
  try {
    const user = req.session.user;
    const id = await empDao.createFoodTicket(req.body, user.id);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/tickets/other', async (req, resp) => {
  try {
    const user = req.session.user;
    const id = await empDao.createOtherTicket(req.body, user.id);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/login', async (req, resp) => {
  try {
    const user = await empDao.findByUsernameAndPassword(req.body.username, req.body.password);
    if (user) {
      req.session.user = user;// authorization for
      resp.json(user);
    } else {
      resp.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})