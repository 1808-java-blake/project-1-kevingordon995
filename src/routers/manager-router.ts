import { Request, Response } from 'express';
import express from 'express';
import * as managerDao from '../dao/manager-dao';
import { authMiddleware } from '../security/authorization-middleware';

export const managerRouter = express.Router();

managerRouter.put('/approved', [authMiddleware(2), async (req, resp)=>{
  try{
    const user = req.session.user;
    const id = await managerDao.approvedTicket(req.body, user.id);
    resp.status(201);
    resp.json(id);
  } catch (err){
    console.log(err);
    resp.status(500);
  }
}])
managerRouter.put('/denied', [authMiddleware(2), async (req, resp)=>{
  try{
    const user = req.session.user;
    const id = await managerDao.deniedTicket(req.body, user.id);
    resp.status(201);
    resp.json(id);
  } catch (err){
    console.log(err);
    resp.status(500);
  }
}])
managerRouter.post('/login', async (req, resp) => {
   try {
     const user = await managerDao.findByUsernameAndPassword(req.body.username, req.body.password);
     if (user) {
       req.session.user = user;
       resp.json(user);
     } else {
       resp.sendStatus(401);
     }
   } catch (err) {
     console.log(err);
     resp.sendStatus(500);
   }
 })
  managerRouter.post('', async (req: Request, resp: Response)=>{
    console.log('creating manager')
    try {
    const id = await managerDao.createManager(req.body);
    resp.status(201);
     resp.json(id);
    } catch (err){
    console.log(err);
    resp.sendStatus(500);
    }
})