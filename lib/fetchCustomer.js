class fetch {
    static customerDetails(details){
     let cusDetail ={}
     cusDetail.customer_id = details[0].customer_id
     cusDetail.firstname = details[0].firstname
     cusDetail.lastname = details[0].lastname
     cusDetail.email = details[0].email
     cusDetail.state = details[0].state
     cusDetail.city = details[0].city
     cusDetail.number = details[0].number
     cusDetail.gender = details[0].gender
     cusDetail.age = details[0].age
     cusDetail.verified = details[0].verified
   

     return cusDetail
    }
}
module.exports = fetch
    