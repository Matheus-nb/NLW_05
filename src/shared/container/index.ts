import { container } from 'tsyringe';

import IMessagesRepository from '../../modules/messages/repositories/IMessagesRepository';
import MessagesRepository from '../../modules/messages/infra/typeorm/repositories/MessagesRepository';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import ISettingsRepository from '../../modules/settings/repositories/ISettingsRepository';
import SettingsRepository from '../../modules/settings/infra/typeorm/repositories/SettingsRepository';

import IConnectionsRepository from '../../modules/connections/repositories/IConnectionsRepository';
import ConnectionsRepository from '../../modules/connections/infra/typeorm/repositories/ConnectionsRepository';

container.registerSingleton<IMessagesRepository>(
    'MessagesRepository',
    MessagesRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<ISettingsRepository>(
    'SettingsRepository',
    SettingsRepository,
);

container.registerSingleton<IConnectionsRepository>(
    'ConnectionsRepository',
    ConnectionsRepository,
);
