module.exports = class DAO {


     static async insertData(model, data) {
        try{
        const a=  await model.insert(data)
        console.log(a)
        return a
        }catch(e){
            console.log(e)
            throw e
        }
    }
}