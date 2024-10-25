const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');
const Transaction = require('./transaction');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keypar = ChainUtil.genKeyPair(); // gera uma chave pública e privada para o meu objeto
        this.publicKey = this.keypar.getPublic().encode('hex');
    }

    toString() {
        return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`;
    }

    sign(dataHash) { // método para assinar uma transação, baseado no método sign da biblioteca elliptic
        return this.keypar.sign(dataHash);
    }

    createTransaction(recipient, amount, blockchain, transactionPool) {
        this.balance = this.calculateBalance(blockchain);
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);
        if (transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction)
        }

        return transaction;
    }

    static blockchainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }

    calculateBalance(blockchain) {
        let balance = this.balance; // variável balance armazena o saldo da carteira
        let transactions = [];
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            transactions.push(transaction); // adiciona todas as transações do blockchain ao array transactions
        }));

        let startTime = 0;

        // transações enviadas por essa carteira
        const walletInputTs = transactions.filter(transaction => transaction.input.address === this.publicKey);

        if (walletInputTs.length > 0) {
            // reduz o array de transações até ter o elemento com o maior timestamp, que será a última transação
            const recentInputTs = walletInputTs.reduce(
                (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current, 0
            );

            // atualiza o saldo da carteira com o saldo restante após última transação enviada
            balance = recentInputTs.outputs.find(output => output.address === this.publicKey).amount;
            startTime = recentInputTs.input.timestamp;
        }

        transactions.forEach(transaction => {
            if (transactions.input.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if (output.address === this.publicKey) { // verifica nas transações, se a carteira é o destinatário
                        balance += output.amount; // atualiza o saldo com o valor recebido na transação
                    }
                });
            }
        });

        return balance;
    }
}

module.exports = Wallet;