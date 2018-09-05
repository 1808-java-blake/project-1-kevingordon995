import { Request, Response } from 'express';
import express from 'express';
import * as empDao from '../dao/emp-dao';

export const empRouter = express.Router();

empRouter.get('', async (req: Request, resp: Response) => {
  try {
    console.log('retrieving all users');
    let users = await empDao.findAll();
    resp.json(users);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});
empRouter.get('/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving user with id ${id}`);
  try {
    let user = await empDao.findById(id);
    if (user !== undefined) {

      resp.json(user);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});
empRouter.post('', async (req, resp) => {
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