import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('connections')
class Connections {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    admin_id: string;

    @Column()
    socket_id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Connections;
