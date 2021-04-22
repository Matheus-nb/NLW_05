import { container } from 'tsyringe';
import { io } from '../http';

import ConnectionsService from '../../../../modules/connections/services/ConnectionsService';
import ConnectionsByUserId from '../../../../modules/connections/services/ConnectionsByUserId';
import UsersServices from '../../../../modules/users/services/UsersServices';
import MessagesServices from '../../../../modules/messages/services/MessagesServices';

io.on('connect', socket => {
    const connectionsService = container.resolve(ConnectionsService);
    const connectionsByUserId = container.resolve(ConnectionsByUserId);
    const usersServices = container.resolve(UsersServices);
    const messagesServices = container.resolve(MessagesServices);

    socket.on('client_first_access', async params => {
        const socket_id = socket.id;
        const { text, email } = params;

        const user = await usersServices.execute(email);
        const connection = await connectionsByUserId.execute(user.id);

        if (!connection) {
            await connectionsService.execute({
                socket_id,
                user_id: user.id,
            });
        } else {
            connection.socket_id = socket_id;
            await connectionsService.execute(connection);
        }

        await messagesServices.execute({ text, user_id: user.id });
    });
});
