const express = require("express");
const bodyParser = require('body-parser')

const app = express();

import { Pool } from "pg";

type Migration = {
    sql: string;
    tableName: string;
};

const migrations: Migration[] = [
    {
        sql: `--sql
        CREATE TABLE IF NOT EXISTS type_hero_visit (
            id serial,
            account_id int,
            session_token char(100) NOT NULL,
            create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modify_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );`,
        tableName: "type_hero_visit",
    },
    {
        sql: `--sql
        CREATE TABLE IF NOT EXISTS type_hero_test_start (
            id serial,
            account_id int,
            session_token char(100) NOT NULL,
            create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modify_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );`,
        tableName: "type_hero_test_start",
    },
    {
        sql: `--sql
        CREATE TABLE IF NOT EXISTS type_hero_test_end (
            id serial,
            account_id int,
            session_token char(100) NOT NULL,
            create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modify_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );`,
        tableName: "type_hero_test_start",
    }
];

const db: Pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "orson-hub",
    password: "OrsonDC",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const postgresConnection = async () => {
    await db.query("SELECT NOW()", (err: any, result: any) => {
        if (err) {
            return console.error("Error executing query", err.stack);
        }
        console.log(result.rows[0].now);
        console.log("Connected Postgres pool");
    });

    migrations.forEach(async (mig: any) => {
        await db.query(mig.sql, (err: any, result: any) => {
            if (err) {
                return console.error(
                    "Error executing migration:",
                    `${mig.tableName} \n`,
                    err.stack
                );
            }
        });
    });
};


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/health", (req: any, res: any, next: any) => {
    console.log("Time: ", Date.now());
    next();
});

app.get("/health", (req: any, res: any) => {
    res.send("Api is healthy \n");
});

app.post("/visit", (req: any, res: any) => {
    db.query(
        `--sql
    INSERT INTO type_hero_visit (
        account_id,
        session_token 
    ) VALUES (
        $1,
        $2
    )`,
        [req.body.accountId, req.body.sessionToken],
        (err: any, result: any) => {
            if (err) {
                return console.error(err.stack);
            }
        }
    );
    res.send("done")
});

app.post("/test-start", (req: any, res: any) => {
    db.query(
        `--sql
    INSERT INTO type_hero_test_start (
        account_id,
        session_token 
    ) VALUES (
        $1,
        $2
    )`,
        [req.body.accountId, req.body.sessionToken],
        (err: any, result: any) => {
            if (err) {
                return console.error(err.stack);
            }
        }
    );
    res.send("done")
});

app.post("/test-end", (req: any, res: any) => {
    db.query(
        `--sql
    INSERT INTO type_hero_test_end (
        account_id,
        session_token 
    ) VALUES (
        $1,
        $2
    )`,
        [req.body.accountId, req.body.sessionToken],
        (err: any, result: any) => {
            if (err) {
                return console.error(err.stack);
            }
        }
    );
    res.send("done")
});

app.listen(3000, () => console.log("listening on :3000"));

postgresConnection();