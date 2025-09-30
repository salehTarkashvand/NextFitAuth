import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";

const adapetr = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapetr, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV,
    },
  },
});
