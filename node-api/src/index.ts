const express = require("express");

const app = express();

const { Client, Pool } = require("pg");

type Migration = {
  sql: string;
  tableName: string;
};

const migrations: Migration[] = [
  {
    sql: `--sql
    CREATE TABLE IF NOT EXISTS type_hero_visits (
        id serial,
        account_id int,
        session_token char(100) NOT NULL,
        create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modify_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );`,
    tableName: "type_hero_visits",
  },
];

const postgresConnection = async () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "orson-hub",
    password: "OrsonDC",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  await pool.query("SELECT NOW()", (err: any, result: any) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log(result.rows[0].now);
    console.log("Connected Postgres pool");
  });

  migrations.forEach(async (mig: any) => {
    await pool.query(mig.sql, (err: any, result: any) => {
      if (err) {
        return console.error(
          "Error executing migration:",
          `${mig.tableName} \n`,
          err.stack
        );
      }
      console.log();
    });
  });
};

app.use("/health", (req: any, res: any, next: any) => {
  console.log("Time: ", Date.now());
  next();
});

app.get("/health", (req: any, res: any) => {
  res.send("Api is healthy \n");
});

app.listen(3000, () => console.log("listening on :3000"));

postgresConnection();
