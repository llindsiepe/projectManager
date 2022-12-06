import { Router } from 'express';
import ProjectController from './app/controllers/ProjectController';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/project', ProjectController.store);
routes.get('/projects', ProjectController.index);
routes.get('/project', ProjectController.adress);

export default routes;
