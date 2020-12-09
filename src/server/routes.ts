import express, { Request, Response } from 'express';
import db from './db';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {

  const {date} = req.body

  console.log("date",date)
  const query1 = `
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL,
        text text,
        date text,
        done boolean
    )
    `;
  const query2 = `
    SELECT * FROM todos WHERE date='${date}'
    `;
  try {
    const resp1 = await db.query(query1);
    const resp2 = await db.query(query2);
    console.log('db get resp2', resp2.rows);
    res.send(resp2.rows);
  } catch (err) {
    console.log(err);
  }
});

router.get('/allnotdone', async (req: Request, res: Response) => {

  const query = `
    SELECT * FROM todos WHERE done='false'
    `;
  try {
    const resp = await db.query(query);
    console.log('db get resp2', resp.rows);
    res.send(resp.rows);
  } catch (err) {
    console.log(err);
  }
});

router.get('/all', async (req: Request, res: Response) => {

  const query = `
    SELECT * FROM todos
    `;
  try {
    const resp = await db.query(query);
    console.log('db get resp2', resp.rows);
    res.send(resp.rows);
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

router.post('/remove', async (req: Request, res: Response) => {
  const { id } = req.body;

  const query = `
    DELETE FROM todos 
    WHERE id='${id}' RETURNING id
    `;
  try {
    const resp = await db.query(query);
    console.log("resp", resp.rows)
    res.send(resp.rows[0]);
  } catch (err) {
    console.log(err);
  }
  
});

router.post('/done', async (req: Request, res: Response) => {
  const { id } = req.body;

  const query = `
    UPDATE todos SET done='true' WHERE id='${id}' RETURNING id
    `;
  try {
    const resp = await db.query(query);
    res.send(resp.rows[0]);
  } catch (err) {
    console.log(err);
  }
  
});

module.exports = router;
