const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');

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
}

module.exports = Wallet;