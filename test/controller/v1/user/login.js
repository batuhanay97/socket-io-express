const expect = require('expect');
const _ = require('lodash');
const request = require('supertest');
const models = require('./../../../../model');
const { HEADER, ERROR, USER_TYPE, USER_LOG } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');
const userSeed = require('./../../../seed/user.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/login`, () => {
        
        it('should login with correct credentials', (done) => {

            expect(userSeed.users[0].isActive).toBeFalsy();
            expect(userSeed.users[0].atWork).toBeFalsy();

            let newToken;

            // This timeout is set not to get the same token
            setTimeout(() => {

                request(app)
                    .post(`/${routePrefix}/login`)
                    .send({
                        email: userSeed.users[0].email,
                        password: userSeed.users[0].passwordPlain
                    })
                    .expect(200)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHENTICATION]).toBeTruthy();
                        newToken = res.headers[HEADER.AUTHENTICATION];
                        console.log(newToken)
                    })
                    .end((err) => {
                        if (err) return done(err);

                        // Find new token
                        models.userToken.findOne({ where: { token: newToken } })
                            .then(ut => {
                                expect(ut).toBeTruthy();
                                done();
                            })
                            .catch((e) => done(e));
                            
                    });

            }, 1000);
                
        });

        it('should not login if no user found with this email', (done) => {
            
            request(app)
                .post(`/${routePrefix}/login`)
                .send({
                    email: 'dummy@gmail.com',
                    password: 'password0'
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.USER_NOT_FOUND.code);
                })
                .end(done);

        });

        it('should not login if email is correct but password is incorrect', (done) => {

            request(app)
                .post(`/${routePrefix}/login`)
                .send({
                    email: userSeed.users[0].email,
                    password: 'wrong password'
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.INCORRECT_CREDENTIALS.code);
                })
                .end(done);

        });

    });
}