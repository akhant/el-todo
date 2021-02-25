import { Client } from 'pg';
import PG_URL from './secret';
const client = new Client({
  connectionString: PG_URL,
});
client.connect((err: any) => {
  if (err) {
    console.error('db connection error', err.stack);
  } else {
    console.log('db connected');
  }
});

export default client;
