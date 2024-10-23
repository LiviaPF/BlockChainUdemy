const Wallet = require('./wallet');
const TransactinPool = require('./transaction-pool');

describe('Wallet', () => {
    let wallet, tp;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactinPool();
    });

    describe('creating a transaction', () => {
        let transaction, sentAmount, recipient;

        beforeEach(() => {
            sentAmount = 50;
            recipient = 'r4nd0m-4ddr355';
            transaction = wallet.createTransaction(recipient, sentAmount, tp);
        });

        describe('doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sentAmount, tp);
            });

            it('double the sent amount subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - sentAmount * 2);
            });
            it('clone the sent amonunt for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount)).toEqual([sentAmount, sentAmount]);
            });
        });
    });
});