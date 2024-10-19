const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // modelo de criptografia de curva elíptica utilizado pela Bitcoin

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }
}

module.exports = ChainUtil;