const bcrypt = require('bcrypt')


module.exports = { 
    async crypt(data) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data, salt);
            
            return hash;
        }
        catch(err) {
            return console.log("Erreur de cryptage" + err);
        }
    },


    async cryptCompare(data, dataEncrypted) {
        const compare = new Promise(async(resolve, reject) => {
            await bcrypt.compare(data, dataEncrypted, (err, same) => {
                if (err) {
                    reject("Une erreur est survenue lors de la comparaison" + err)
                } else if (!same){
                    reject ("La comparaison a échouée")
                } else {
                    resolve (true)
                }
            })
        })
    }
}