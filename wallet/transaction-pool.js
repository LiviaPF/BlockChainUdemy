/*
ABOUT TRANSACTION POOL:
In blockchain, a transaction pool (also known as a memory pool or mempool) is a collection of all the transactions that have been broadcast to the network but have not yet been included in a block. These transactions are waiting to be validated and added to the blockchain by miners.

Broadcasting Transactions: When a user initiates a transaction, it is broadcast to the network and added to the transaction pool of each node.
Validation: Nodes validate the transactions in the pool to ensure they are legitimate (e.g., the sender has sufficient balance).
Mining: Miners select transactions from the pool to include in the next block. They typically prioritize transactions with higher fees.
Inclusion in Block: Once a transaction is included in a block and the block is added to the blockchain, the transaction is removed from the pool.
*/

class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction(transaction) {
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);

        if(transactionWithId) {
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }
}

module.exports = TransactionPool;