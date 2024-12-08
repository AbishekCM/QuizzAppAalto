import { Application, Session } from "./app/deps.js";
import { authMiddleware } from "./app/middlewares/authMiddleware.js";
import { errorMiddleware } from "./app/middlewares/errorMiddleware.js";
import { renderMiddleware } from "./app/middlewares/renderMiddleware.js";
import { userMiddleware } from "./app/middlewares/userMiddleware.js";
import { router } from "./app/routes/routes.js";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = new Application();
app.use(Session.initMiddleware());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(userMiddleware);
app.use(renderMiddleware);
app.use(oakCors());
app.use(router.routes());

app.listen({ port: 7777 });
