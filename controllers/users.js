const User = require('../models/user');
const jwt = require('jsonwebtoken');


const createTokenJWT = (user) => {
    const payload = {
        id: user.id
    };

    const token = jwt.sign(payload, 'senhaforteaqui', {expiresIn: '50m'});
    return token;
}

module.exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = new User({ email, username: name });
        const registeredUser = await User.register(user, password);
        res.status(201).send(JSON.parse(JSON.stringify(registeredUser)));
    } catch(e){
        res.send(JSON.stringify(e.message));
    }
}

module.exports.login = (req, res) =>{
    const token = createTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
}
