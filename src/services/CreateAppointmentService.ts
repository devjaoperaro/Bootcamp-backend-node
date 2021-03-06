//para conseguir usar o repositorio
import { getCustomRepository } from 'typeorm'
import { startOfHour } from 'date-fns'
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request {
    provider_id: any;
    date: Date;
}

class CreateAppointmentService {
    public async execute({date, provider_id}: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);
        
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if(findAppointmentInSameDate){
            throw Error('this appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;