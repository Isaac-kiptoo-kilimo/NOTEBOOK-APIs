import * as sql from "mssql";
import dotenv from "dotenv";

import { dbConfig } from "../config/db";

dotenv.config();

const pool = new sql.ConnectionPool(dbConfig);


const poolConnect = pool.connect();

export async function new_query(queryString: string): Promise<sql.IResult<any>> {
  await poolConnect;

  try {
    const request = new sql.Request(pool);
    const result = await request.query(queryString);
    return result;
  } catch (error) {
    throw new Error(`Error executing SQL query: ${error}`);
  }
}
