import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public exceute({ title, type, value }: RequestDTO): Transaction {

    if (type === 'outcome'){
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < value) {
        throw Error('You don`t have enough balance');
      }
    }
    const Transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return Transaction;
  }
}
export default CreateTransactionService;
