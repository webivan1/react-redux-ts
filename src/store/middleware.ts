import { createLogger } from "redux-logger";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { Middleware } from "redux";

export const logger = createLogger({
  duration: true,
  collapsed: true
});

const development = process.env.NODE_ENV === 'development';

const middleware: Middleware[] = [...getDefaultMiddleware()];

if (development) {
  middleware.push(logger)
}

export { middleware }
