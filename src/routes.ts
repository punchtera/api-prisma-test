import { Router } from 'express';

const routes = Router();

routes.get('/', async (_req, res) => {
    return res.json({ message: "Helloworld" });
});

export default routes;