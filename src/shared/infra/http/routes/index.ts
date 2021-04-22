import { Router } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import messagesRouter from '../../../../modules/messages/infra/http/routes/messages.routes';
import settingsRouter from '../../../../modules/settings/infra/http/routes/settings.routes';
import connectionsRouter from '../../../../modules/connections/infra/http/routes/connections.routes';

const routes = Router();

routes.use('/settings', settingsRouter);
routes.use('/messages', messagesRouter);
routes.use('/users', usersRouter);
routes.use('/connections', connectionsRouter);

export default routes;
