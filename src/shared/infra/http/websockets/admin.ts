import { container } from 'tsyringe';
import { io } from '../http';

import ConnectionsByUserId from '../../../../modules/connections/services/ConnectionsByUserId';
import UpdateAdminIdService from '../../../../modules/connections/services/UpdateAdminIdService';
import ConnectionsWithoutAdminService from '../../../../modules/connections/services/ConnectionsWithoutAdminService';
import MessagesServices from '../../../../modules/messages/services/MessagesServices';
import MessagesListByUserServices from '../../../../modules/messages/services/MessagesListByUserServices';

io.on('connect', async socket => {
    const connectionsByUserId = container.resolve(ConnectionsByUserId);
    const updateAdminIdService = container.resolve(UpdateAdminIdService);
    const connectionsWithoutAdminService = container.resolve(
        ConnectionsWithoutAdminService,
    );
    const messagesServices = container.resolve(MessagesServices);
    const messagesListByUserServices = container.resolve(
        MessagesListByUserServices,
    );

    let allConnectionsWithoutAdmin = await connectionsWithoutAdminService.execute();

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);

    socket.on('admin_list_messages_by_user', async (params, callback) => {
        const { user_id } = params;

        const allMessages = await messagesListByUserServices.execute(user_id);

        callback(allMessages);
    });

    socket.on('admin_send_message', async params => {
        const { text, user_id } = params;

        await messagesServices.execute({
            text,
            user_id,
            admin_id: socket.id,
        });

        const connection = await connectionsByUserId.execute(user_id);

        if (connection) {
            io.to(connection.socket_id).emit('admin_send_to_client', {
                text,
                socket_id: connection.socket_id,
            });
        }
    });

    socket.on('admin_user_in_support', async params => {
        const { user_id } = params;
        await updateAdminIdService.execute({
            user_id,
            admin_id: socket.id,
        });

        allConnectionsWithoutAdmin = await connectionsWithoutAdminService.execute();

        io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
    });
});
