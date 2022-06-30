const expect = require('expect');
const request = require('supertest');
const models = require('./../../../../model');
const { HEADER, ERROR, REQUEST_STATUS, CREATION_TYPE } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');
const userSeed = require('./../../../seed/user.seed');
const bcrypt = require('bcryptjs');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}`, () => {

        it('should send friend request', done => {

            request(app)
                .post(`/${routePrefix}/`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[0].token)
                .send({
                    receiverId: commonSeed.users[3].id
                })
                .expect(200)
                .end(err => {
                    if(err) return done(err);

                    models.friendRequest.findOne({
                            where: {
                                status: REQUEST_STATUS.PENDING,
                                receiverId: commonSeed.users[3].id,
                                creatorId: commonSeed.userTokens[0].userId
                            }
                        })
                        .then(request => {
                            expect(request).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });
        });


        it('should not send request if sending yourself', done => {

            request(app)
                .post(`/${routePrefix}/`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[0].token)
                .send({
                    receiverId: commonSeed.users[0].id
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.CAN_NOT_REQUEST.code)
                })
                .end(done);

        });

        it('should not send request if already exists', done => {

            request(app)
                .post(`/${routePrefix}/`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[1].token)
                .send({
                    receiverId: commonSeed.friendRequests[0].receiverId
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.REQUEST_ALREADY_EXISTS.code)
                })
                .end(done);

        });

    });

}