import { Request, Response } from 'express';
import express from 'express';
import * as ticketDao from '../dao/tick-dao';

export const ticketRouter = express.Router();
/**
 * Find ticket by id or all depending on role
 */
ticketRouter.get('', async (req: Request, resp: Response) => {
  const id = req.session.user.id;
  const roleId = req.session.user.roleId;
  console.log(`retreiving tickets for ${id}`)
  try {
    let tickets = await ticketDao.findByIdOrAll(id, roleId);
    resp.json(tickets);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});
/**
 * Find all tickets
 */
// ticketRouter.get('/all', async (req: Request, resp: Response) => {
//     try {
//       console.log('retrieving all tickets');
//       let tickets = await ticketDao.findAll();
//       resp.json(tickets);
//     } catch (err) {
//       resp.sendStatus(500);
//     }
//   });