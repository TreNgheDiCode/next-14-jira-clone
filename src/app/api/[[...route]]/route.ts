import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";

const api = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = api.route("/auth", auth).route("/workspaces", workspaces);

export const GET = handle(api);
export const POST = handle(api);
export const PUT = handle(api);
export const PATCH = handle(api);
export const DELETE = handle(api);

export type ApiType = typeof routes;
