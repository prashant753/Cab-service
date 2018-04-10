
const jwt = require('jsonwebtoken');
const constants=require("../constant").constantMessage.errorMessage.eng


    function customertokenGenerate(id)
    { try{
        const token = jwt.sign({ session: id },'customer', { expiresIn: '50m' })
        return token;
        }
        catch(e){
           throw(e)
        }
    }
    function drivertokenGenerate(id)
    { try{
        const token = jwt.sign({ session: id },'driver', { expiresIn: '50m' })
        return token;
        }
        catch(e){
           throw(e)
        }
    }
    function admintokenGenerate(id)
    { try{
        const token = jwt.sign({ session: id },'admin', { expiresIn: '50m' })
        return token;
        }
        catch(e){
           throw(e)
        }
    }

  function verifyCustomerToken(token)
    {   
        try{
        const decoded=jwt.verify(token,'customer')
        const id=decoded.session;
        return id;
        }catch(error){
            if(error.message==='jwt expired')
            throw(constants.tokenExpired)
            else if(error.message==='invalid signature')
            throw(constants.invalidToken)
            else if(error.message==='invalid token')
            throw(constants.invalidToken)
            else
            throw(error)
        }
    }

    function verifyAdminToken(token)
    {   
        try{
        const decoded=jwt.verify(token,'admin')
        const id=decoded.session;
        return id;
        }catch(error){
            if(error.message==='jwt expired')
            throw(constants.tokenExpired)
            else if(error.message==='invalid signature')
            throw(constants.invalidToken)
            else if(error.message==='invalid token')
            throw(constants.invalidToken)
            else
            throw(error)
        }
    }

    function verifyDriverToken(token)
    {   
        try{
        const decoded=jwt.verify(token,'driver')
        const id=decoded.session;
        return id;
        }catch(error){
            if(error.message==='jwt expired')
            throw(constants.tokenExpired)
            else if(error.message==='invalid signature')
            throw(constants.invalidToken)
            else if(error.message==='invalid token')
            throw(constants.invalidToken)
            else
            throw(error)
        }
    }

module.exports={
    customertokenGenerate : customertokenGenerate,
    drivertokenGenerate : drivertokenGenerate,
    admintokenGenerate : admintokenGenerate,
    verifyCustomerToken : verifyCustomerToken,
    verifyAdminToken :  verifyAdminToken,
    verifyDriverToken : verifyDriverToken
}