const jwt = require('jsonwebtoken');
require("dotenv").config();


try {
    const options = {
        algorithm: 'HS256'
    };

    let token = jwt.sign({ id: 1, name: 'kickscar', profileImage: 'profile.jpg' }, process.env.ACCESS_TOKEN_SECRET, options);
    token = token.toUpperCase();

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
} catch (error) {
    console.error(error);
}

// invalid, token 값을 모두 대문자로 했기 때문에 token 내용이 달라진다.