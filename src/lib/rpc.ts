import { hc } from "hono/client";

import { ApiType } from "@/app/api/[[...route]]/route";

export const client = hc<ApiType>(process.env.NEXT_PUBLIC_API_URL!);
