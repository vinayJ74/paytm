const zod=require("zod")

const userz=zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(6)
})

module.exports ={userz}