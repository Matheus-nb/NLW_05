import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('messages')
class Messages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;
}

export default Messages;
