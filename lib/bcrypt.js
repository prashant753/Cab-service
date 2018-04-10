const Bcrypt = require('bcrypt')
async function encryptPassword(plainPassword) {
    try {
        const salt=Bcrypt.genSaltSync(10);
      const hash=Bcrypt.hashSync(plainPassword,salt) 
       return hash;
    } catch (error) {
        throw error
    }

}

async function decryptPassword(plainPassword,hash) {
    try {
        return Bcrypt.compareSync(plainPassword, hash)
    } catch (error) {
        throw error;
    }
}

module.exports = {
    encryptPassword : encryptPassword,
    decryptPassword : decryptPassword
}