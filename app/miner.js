/*
    The miner class is responsible for getting transactions from the transaction pool
    and creating new blocks and adding them to the blockchain.
    The miners are rewarded with a certain amount of coins for their work.
*/

class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine() {
        const validTransactions = this.transactionPool.validTransactions();
    }
}

module.exports = Miner;