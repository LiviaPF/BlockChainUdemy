const EC = require('elliptic').ec;
const uuidV1 = require('uuid'); // gera um id único, baseado no timestamp
const ec = new EC('secp256k1'); // modelo de criptografia de curva elíptica utilizado pela Bitcoin

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidV1.v1();
    }
}

module.exports = ChainUtil;