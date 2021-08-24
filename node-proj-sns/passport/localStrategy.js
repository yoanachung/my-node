const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', //req.body.email
        passwordField: 'password' //req.body.password
    }, async (email, password, done) => { //done(에러, 성공, 실패)
        try {
            const exUser = await User.findOne({ where: {email} });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '이메일 혹은 비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '이메일 혹은 비밀번호가 일치하지 않습니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }))
};