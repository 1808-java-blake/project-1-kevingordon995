import { Request, Response } from 'express';
import express from 'express';
import * as empDao from '../dao/emp-dao';

export const empRouter = express.Router();

empRouter.post('/employees', async (req: Request, resp: Response) => {
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
empRouter.post('/userRoles', async (req, resp) => {
  console.log('creating user roles')
  try {
    const id = await empDao.createUserRoles(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/managers', async (req, resp)=>{
  console.log('creating manager')
  try {
    const id = await empDao.createManager(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err){
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/tickets/status', async (req, resp)=>{
  console.log('creating status')
  try {
    const id = await empDao.createStatus(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err){
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/tickets/types', async (req, resp)=>{
  console.log('creating types')
  try {
    const id = await empDao.createTypes(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err){
    console.log(err);
    resp.sendStatus(500);
  }
})
empRouter.post('/employees/login', async (req, resp) => {

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
empRouter.post('/tickets/cert', async (req, resp) => {
    try {
      const id = await empDao.createCertifTicket(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })
  empRouter.post('/tickets/travel', async (req, resp) => {
    try {
      const id = await empDao.createTravelTicket(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })
  empRouter.post('/tickets/medical', async (req, resp) => {
    try {
      const id = await empDao.createMedicalTicket(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  })