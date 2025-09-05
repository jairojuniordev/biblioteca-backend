import CreateBookController from 'controllers/Book/CreateBookController';
import CreateSessionController from 'controllers/Session/CreateSessionController';
import CreateUserController from 'controllers/User/CreateUserController';
import { Router } from 'express';
import { AuthMiddleware } from 'middlewares/authMiddleware';

const routes = Router();

routes.post('/user/create', CreateUserController.handle);

routes.post('/session/create', CreateSessionController.handle);

routes.post('/book/create', AuthMiddleware(), CreateBookController.handle);

export { routes };
