import CreateSessionController from 'controllers/Session/CreateSessionController';
import CreateUserController from 'controllers/User/CreateUserController';
import { Router } from 'express';

const routes = Router();

routes.post('/user/create', CreateUserController.handle);

routes.post('/session/create', CreateSessionController.handle);


export { routes };
