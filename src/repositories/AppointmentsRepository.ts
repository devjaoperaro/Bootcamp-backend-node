import { EntityRepository, Repository} from 'typeorm';
import Appointment from '../models/Appointment';


// classe criada para funcao q nao existe no repository do typeorm
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
    public async findByDate(date: Date): Promise<Appointment | null> {

        //quer encontrar um appointment onde a data seja igual a q ta sendo passada
        const findAppointment = await this.findOne({
            where: { date: date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;