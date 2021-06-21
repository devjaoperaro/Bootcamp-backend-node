import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from './User';

@Entity('appointments')
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    //deixando o paramentro vazio a tipagem é string
    @Column()
    provider_id: string;
    
    // relacionamento
    @ManyToOne(() => User)
    // informando qual coluna é a do relacionamento
    @JoinColumn({ name: 'provider_id' })
    // instanciando
    provider: User

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;