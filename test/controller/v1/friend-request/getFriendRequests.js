const expect = require('expect');
const _ = require('lodash');
const request = require('supertest');
const models = require('./../../../../model');
const { HEADER, ERROR, USER_TYPE, USER_LOG } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');
const userSeed = require('./../../../seed/user.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/all`, () => {

        it('should get all friend requests', done => {

            request(app)
                .post(`/${routePrefix}/all`)
                .set(HEADER.AUTHENTICATION, commonSeed.userTokens[0].token)
                .expect(200)
                .expect(res => {
                    expect(res.body.length).toEqual(commonSeed.friendRequests.filter(request => request.receiverId === commonSeed.userTokens[0].userId).length);
                })
                .end(done);
            
        });

    });
    
}