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

    // describe('updating a transaction', () => {
    //     let nextAmount, nextRecipient;
    //
    //     beforeEach(() => {
    //         nextAmount = 20;
    //         nextRecipient = 'n3xt-4ddr355';
    //         transaction = transaction.update(wallet, nextRecipient, nextAmount);
    //     });
    //
    //     it(`subtracts the next amount from the sender's output`, () => {
    //         expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
    //             .toEqual(wallet.balance - amount - nextAmount);
    //     });
    //
    //     it('outputs an amount for the next recipient', () => {
    //         expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
    //             .toEqual(nextAmount);
    //     });
    // });
    //
    // describe('creating a reward transaction', () => {
    //     beforeEach(() => {
    //         transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
    //     });
    //
    //     it(`rewards the miner's wallet`, () => {
    //         expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
    //             .toEqual(Transaction.MINING_REWARD);
    //     });
    // });
});