const { userz } = require('./type');

const{ User} =require("./database")
async function userauthentication(req, res, next) {
    const { firstname } = req.body;  // Extract firstname from req.body

    try {
        // Find the user by firstname
        const user = await User.findOne({ firstname });
        
        // If user doesn't exist, return 401 Unauthorized
        if (!user) {
            return res.status(401).json({ msg: "Authentication failed. User not found." });
        }

        // If user exists, proceed to the next middleware or route handler
        req.user = user;  // Attach the user to req object, if needed
        next();

    } catch (error) {
        // Log and send error response
        console.log(error);
        res.status(500).json({ msg: "An error occurred during authentication", error });
    }
}

app.post("/signup",async function(req,res){
    const {firstname,password,lastname}=req.body

    const rightuser=userz.safeParse(req.body)
    if(!(rightuser.success)){
        res.status(403).send("please send correct input response")
    }
    else{
     try{const response=  await User.create({
            firstname,
            password,
            lastname
        })
        
        res.json({msg:"user created succesfully",
            username:response.firstname
        })}
        catch(e){
            console.log("some error occured something wrong with backend")
            res.status(500).json({ msg: "Something went wrong with the backend" });
        }
    }

})

app.post("/signin",async function (req,res){
    const {firstname,lastname,password}=req.body // this value if(value) could be null 
   await User.findOne(req.body).then(function(value){
    if(value){
        res.send(`welcome ${firstname}`)
    }
    else{
        res.send("no such user found first signup")
    }
   })
})


 
    

app.put("/signout", userauthentication, async function(req, res) {
    const { firstname, lastname, password } = req.body;  // Destructure properties from req.body

    try {
        // Update the user's password based on their firstname
        const result = await User.updateOne({ firstname }, { $set: { password } });

        // If no document was modified (user not found or no changes made)
        if (result.modifiedCount === 0) {
            return res.status(404).json({ msg: "User not found or no changes made" });
        }

        // Success response
        res.status(200).json({
            msg: "Password updated successfully",
            // Avoid sending password back in the response
        });

    } catch (error) {
        // Error handling
        res.status(500).json({ msg: "An error occurred", error });
    }
});












app.listen(3000)


