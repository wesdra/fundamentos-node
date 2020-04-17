import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransation {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface ExtractTransaction {
  transactions: Transaction[];
  balance: Balance;
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private sum (items:Transaction[]):number {
    if (items == null || items.length === 0)
        return 0;

    let result: number = items
      .map(item => item.value)
      .reduce(function(a, b) {
        return a + b;
      });
    return result;
  }

  public all(): ExtractTransaction {
    const transactions = this.transactions;
    let balance = this.getBalance();
    return { transactions, balance  };
  }

  public getBalance(): Balance {
    const ListOutcome = this.transactions.filter(it => it.type.includes('outcome'));
    const ListIncome = this.transactions.filter(it => it.type.includes('income'));
    let ValOutcome = this.sum(ListOutcome);
    let ValIncome = this.sum(ListIncome);
    let total:number = (ValIncome - ValOutcome);
    let balance = {
      income: ValIncome,
      outcome: ValOutcome,
      total,
    }
    return  balance;
  }

  public create({title, type, value }:CreateTransation): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }

}
export default TransactionsRepository;
