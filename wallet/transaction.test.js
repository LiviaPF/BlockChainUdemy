const Transaction  = require('./transaction');
const Wallet = require('./wallet');

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount);
    });

    describe('transacting with an amount that exceeds the balance', () => { // o saldo inicial da carteira é 500
        beforeEach(() => {
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('does not create the transaction', () => {
            expect(transaction).toEqual(undefined);
        });
    });

    describe('inputs the balance of the wallet', () => {
        it('inputs the balance of the wallet', () => {
            expect(transaction.input.amount).toEqual(wallet.balance);
        });
    });

    describe('validates a valid transaction', () => {
        it('validates a valid transaction', () => {
            expect(Transaction.verifyTransaction(transaction)).toBe(true);
        });
    });

    describe('invalidates a corrupt transaction', () => {
        beforeEach(() => {
            transaction.outputs[0].amount = 50000; // tenta atualizar o saldo do bloco inicial da transação
        });

        it('invalidates a corrupt transaction', () => {
            expect(Transaction.verifyTransaction(transaction)).toBe(false);
        });
    });
});