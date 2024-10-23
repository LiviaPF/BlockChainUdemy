const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./wallet');

describe('TransactionPool', () => {
   let tp, wallet, transaction;

    beforeEach(() => {
         tp = new TransactionPool();
         wallet = new Wallet();
         transaction = Transaction.newTransaction(wallet, 'r4nd-4ddr355', 30); // amount reffers to the sended amount
         tp.updateOrAddTransaction(transaction);
    });

    it('add a transaction to the pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('update a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'n3xt-r3cip3nt', 50);
        tp.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
            .not.toEqual(oldTransaction);
    });
});