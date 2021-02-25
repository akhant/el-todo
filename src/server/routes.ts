import { languageData } from './../redux/const';
import express, { Request, Response } from 'express';
import db from './db';
import fs from 'fs';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { date } = req.body;

  const query1 = `
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL,
        text text,
        date text,
        done boolean
    )
    `;
  const query2 = `
    SELECT * FROM todos WHERE date=$1
    `;

  try {
    await db.query(query1);
    const resp2 = await db.query(query2, [date]);
    res.send(resp2.rows);
  } catch (err) {
    fs.appendFileSync(
      'errors.txt',
      `${new Date()} \n ${err} \n --------------------------------------------------- \n`
    );
    res.send(err);
  }
});

router.get('/allnotdone', async (req: Request, res: Response) => {
  const query = `
    SELECT * FROM todos WHERE done='false'
    `;

  try {
    const resp = await db.query(query);

    res.send(resp.rows);
  } catch (err) {
    fs.appendFileSync(
      'errors.txt',
      `${new Date()} \n ${err} \n --------------------------------------------------- \n`
    );
    res.send(err);
  }
});

router.post('/add', async (req: Request, res: Response) => {
  const { text, date, done } = req.body;

  const query = `
    INSERT INTO todos ( id, text, date, done )
    VALUES (DEFAULT, $1, $2, $3) 
    RETURNING id;
    `;

  try {
    const resp = await db.query(query, [text, date, done]);

    res.send({
      text,
      date,
      done,
      id: resp.rows[0].id,
    });
  } catch (err) {
    fs.appendFileSync(
      'errors.txt',
      `${new Date()} \n ${err} \n --------------------------------------------------- \n`
    );
    res.send(err);
  }
});

router.post('/remove', async (req: Request, res: Response) => {
  const { id } = req.body;

  const query = `
    DELETE FROM todos 
    WHERE id=$1 RETURNING id
    `;

  try {
    const resp = await db.query(query, [id]);
    res.send(resp.rows[0]);
  } catch (err) {
    fs.appendFileSync(
      'errors.txt',
      `${new Date()} \n ${err} \n --------------------------------------------------- \n`
    );
    res.send(err);
  }
});

router.post('/done', async (req: Request, res: Response) => {
  const { id, doneStatus } = req.body;

  const query = `
    UPDATE todos
    SET done = $1
    WHERE id = $2
    RETURNING id, done, text
    `;
  try {
    const resp = await db.query(query, [doneStatus, id]);
    res.send(resp.rows[0]);
  } catch (err) {
    fs.appendFileSync(
      'errors.txt',
      `${new Date()} \n ${err} \n --------------------------------------------------- \n`
    );
    res.send(err);
  }
});

router.post('/lang', async (req: Request, res: Response) => {
  const { lang } = req.body;

  //@ts-ignore
  const langObj = languageData[lang];
  res.send(langObj);
});

export default router;
