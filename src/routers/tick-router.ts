import { Request, Response } from 'express';
import express from 'express';
import * as ticketDao from '../dao/tick-dao';
import { authMiddleware } from '../security/authorization-middleware';

export const ticketRouter = express.Router();
/**
 * Find all movies
 */
ticketRouter.get('',
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all tickets');
      let tickets = await ticketDao.findAll();
      resp.json(tickets);
    } catch (err) {
      resp.sendStatus(500);
    }
  });

/**
 * Find movie by id
 */
ticketRouter.get('/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving tickets with id ${id}`)
  try {
    let ticket = await ticketDao.findById(id);
    if (ticket !== undefined) {
      resp.json(ticket);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});
ticketRouter.put('/approved', async (req, resp)=>{
  try{
    const user = req.session.user;
    const id = await ticketDao.approvedTicket(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err){
    console.log(err);
    resp.status(500);
  }
})
ticketRouter.put('/denied', async (req, resp)=>{
  try{
    const user = req.session.user;
    const id = await ticketDao.deniedTicket(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err){
    console.log(err);
    resp.status(500);
  }
})