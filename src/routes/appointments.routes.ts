import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// como todas as rotas de agendamento precisam de autenticação nas rotas, basta utilizar assim
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {      

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // find: busca todos os dados lá dentro
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parseDate = parseISO(date);
        
        // instanciar a classe para poder enviar os paramentros
        const createAppointment = new CreateAppointmentService();

        // enviar os parametros
        const appointment = await createAppointment.execute({
            provider_id,
            date: parseDate
        });

        return response.json(appointment);

    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
});

export default appointmentsRouter;