const expect = require('expect');
const _ = require('lodash');
const request = require('supertest');
const models = require('./../../../../model');
const { HEADER, ERROR, USER_TYPE, USER_LOG } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');
const userSeed = require('./../../../seed/user.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/register`, () => {
        
        it('should register with correct credentials', (done) => {

            request(app)
                .post(`/${routePrefix}/register`)
                .send({
                    email: "dummy@email.com",
                    password: "123123..a",
                    name: "dummy name",
                    surname: "dummy surname"
                })
                .expect(200)
                .expect(res => {
                    
                })
                .end(err => {
                    if(err) return done(err);

                    models.user.findOne({
                            where: {
                                email: "dummy@email.com",
                                name: "dummy name",
                                surname: "dummy surname"
                            }
                        })
                        .then(request => {
                            expect(request).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });
                
        });

        it('should not register if user exists', (done) => {
            
            request(app)
                .post(`/${routePrefix}/register`)
                .send({
                    email: commonSeed.users[0].email,
                    password: "123123..a",
                    name: "dummy name",
                    surname: "dummy surname"
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.USER_ALREADY_EXISTS.code);
                })
                .end(done);

        });

    });
}