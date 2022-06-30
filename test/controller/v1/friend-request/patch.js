const expect = require('expect');
const request = require('supertest');
const models = require('./../../../../model');
const { HEADER, ERROR, REQUEST_STATUS, CREATION_TYPE } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');
const userSeed = require('./../../../seed/user.seed');
const bcrypt = require('bcryptjs');

module.exports = (app, routePrefix) => {

    describe(`PATCH/${routePrefix}`, () => {

        it('should patch friend request', done => {

            request(app)
                .patch(`/${routePrefix}/${commonSeed.friendRequests[0].id}`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[0].token)
                .send({
                    "status": REQUEST_STATUS.ACCEPTED
                })
                .expect(200)
                .end(err => {
                    if(err) return done(err);

                    models.friendRequest.findOne({
                            where: {
                                "status": REQUEST_STATUS.ACCEPTED,
                                id: commonSeed.friendRequests[0].id,
                                receiverId: commonSeed.userTokens[0].userId
                            }
                        })
                        .then(request => {
                            expect(request).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });
        });


        it('should not patch request if there is no such as request', done => {

            request(app)
                .patch(`/${routePrefix}/${commonSeed.friendRequests[0].id}`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[1].token)
                .send({
                    "status": REQUEST_STATUS.ACCEPTED
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.FRIEND_REQUEST_NOT_FOUND.code)
                })
                .end(done);

        });

    });

}