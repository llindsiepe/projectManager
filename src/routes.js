import { Router } from 'express';
import ProjectController from './app/controllers/ProjectController';

import SessionController from './app/controllers/SessionController';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/project', ProjectController.store);
routes.get('/projects', ProjectController.index);
routes.get('/project', ProjectController.adress);
routes.put('/projects/:id', ProjectController.update);
routes.patch('/projects/:id/done', ProjectController.patch);
routes.delete('/projects/:id', ProjectController.delete);

routes.post('/sessions', SessionController.store);

export default routes;
