import express, { Request, Response } from 'express';
import db from './db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const query1 = `
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL,
        text text,
        date text,
        done boolean
    )
    `;
  const query2 = `
    SELECT * FROM todos;
    `;
  try {
    const resp1 = await db.query(query1);
    const resp2 = await db.query(query2);
    console.log('db get resp2', resp2);
    res.send(resp2.rows);
  } catch (err) {
    console.log(err);
  }


  
});

router.post('/add', async (req: Request, res: Response) => {
  const { text, date, done } = req.body;

  const query = `
    INSERT INTO todos ( id, text, date, done )
    VALUES (DEFAULT, '${text}', '${date}', '${done}') 
    RETURNING id;
    `;
  try {
    const resp = await db.query(query);

    res.send({
        text: req.body.text,
        date: req.body.date,
        done: false,
        id: resp.rows[0].id,
      });
  } catch (err) {
    console.log(err.stack);
  }
  
});

module.exports = router;
