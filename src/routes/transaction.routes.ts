import { Router } from 'express';
//import { parseISO } from 'date-fns';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transations = transactionsRepository.all();
    return response.json(transations);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;

    const CreateTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    const transation = CreateTransaction.exceute({
      title,
      type,
      value,
    });
    return response.json(transation);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
