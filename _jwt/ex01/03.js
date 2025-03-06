const jwt = require('jsonwebtoken');
require("dotenv").config();

//
// JsonWebTokenError: invalid signature
//


try {
    const options = {
        algorithm: 'HS256'
    };

    const token = jwt.sign({ id: 1, name: 'kickscar', profileImage: 'profile.jpg' }, process.env.ACCESS_TOKEN_SECRET, options);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_OLD); // encrypt키와 대칭인 키가 아닌 다른 key를 이용해 verify 진행 => invalid signature
} catch (error) {
    console.error(error);
}
