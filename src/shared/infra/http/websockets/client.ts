import { container } from 'tsyringe';
import { io } from '../http';

import ConnectionsService from '../../../../modules/connections/services/ConnectionsService';
import ConnectionsWithoutAdminService from '../../../../modules/connections/services/ConnectionsWithoutAdminService';
import ConnectionsByUserId from '../../../../modules/connections/services/ConnectionsByUserId';
import UserByConnectionSocketIdService from '../../../../modules/connections/services/UserByConnectionSocketIdService';
import UsersServices from '../../../../modules/users/services/UsersServices';
import UsersById from '../../../../modules/users/services/UsersById';
import MessagesServices from '../../../../modules/messages/services/MessagesServices';
import MessagesListByUserServices from '../../../../modules/messages/services/MessagesListByUserServices';

io.on('connect', socket => {
    const connectionsService = container.resolve(ConnectionsService);
    const connectionsByUserId = container.resolve(ConnectionsByUserId);
    const connectionsWithoutAdminService = container.resolve(
        ConnectionsWithoutAdminService,
    );

    const userByConnectionSocketIdService = container.resolve(
        UserByConnectionSocketIdService,
    );
    const usersServices = container.resolve(UsersServices);
    const usersById = container.resolve(UsersById);
    const messagesServices = container.resolve(MessagesServices);
    const messagesListByUserServices = container.resolve(
        MessagesListByUserServices,
    );

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

        const allMessages = await messagesListByUserServices.execute(user.id);

        socket.emit('client_list_all_messages', allMessages);

        const allUsers = await connectionsWithoutAdminService.execute();
        io.emit('admin_list_all_users', allUsers);
    });

    socket.on('client_send_to_admin', async params => {
        const { text, socket_admin_id } = params;

        const connection = await userByConnectionSocketIdService.execute(
            socket.id,
        );

        if (connection) {
            const message = await messagesServices.execute({
                text,
                user_id: connection.user_id,
            });

            const user = await usersById.execute(connection.user_id);

            io.emit('admin_receive_message', {
                user,
                message,
                socket_id: socket.id,
            });
        }
    });
});
