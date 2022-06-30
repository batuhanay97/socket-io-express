const expect = require('expect');
const request = require('supertest');
const models = require('./../../../../model');
const { HEADER, ERROR, USER_TYPE, CREATION_TYPE } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');
const userSeed = require('./../../../seed/user.seed');
const bcrypt = require('bcryptjs');

module.exports = (app, routePrefix) => {

    describe(`PATCH/${routePrefix}`, () => {

        it('should patch user if there is no user with this email', done => {

            request(app)
                .patch(`/${routePrefix}`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[0].token)
                .send({
                    "email": "dummyemail@test.com",
                    "password": 'dummy-password0',
                    "name": "name",
                    "surname": "surname"
                })
                .expect(200)
                .end(err => {
                    if(err) return done(err);

                    models.user.findOne({
                            where: {
                                email: 'dummyemail@test.com',
                                id: commonSeed.users[0].id,
                                name: 'name',
                                surname: 'surname'
                            }
                        })
                        .then(user => {
                            expect(user).toBeTruthy();
                            expect(bcrypt.compareSync('dummy-password0', user.password)).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });
        });

        
        it('should get 200 if no field is provided', done => {

            request(app)
                .patch(`/${routePrefix}`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[0].token)
                .send()
                .expect(200)
                .end(done);

        });


        it('should not patch user if there is a user with this email', done => {

            request(app)
                .patch(`/${routePrefix}`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[0].token)
                .send({
                    'email': commonSeed.users[2].email
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.USER_ALREADY_EXISTS.code)
                })
                .end(done);

        });

    });

}