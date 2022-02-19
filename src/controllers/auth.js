const User = require('../model/users');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const { firstname, lastname,email, password } = req.body;
        
        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(201).send({ status:false, message:'email already used, Please use different email!' });
    
        encryptedPassword = await bcrypt.hash(password, 10);
        // register
        const user = new User({
          firstname,
          lastname,
          email,
          password : encryptedPassword,
        });
        await user.save();
        console.log("saved user", user);
        return res.status(201).json({ status:true, message:'User register successfully!' });
      } catch (err) {
        console.log(err);
        res.status(400).send({ status:false, err :err});
      }
}

exports.login = async(req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (user && (await bcrypt.compare(password, user.password))) {

        res.json({ status:true, user:user, message:'Login successfully!'}); 
        }
        res.status(200).send({ status:false, message : "Invalid Credentials"});
      } catch (err) {
        console.log(err);
        res.status(400).send({ status:false, err :err});
      }
}