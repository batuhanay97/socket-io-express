const expect = require('expect');
const bcrypt = require('bcryptjs');
const { ERROR } = require('./../../../util/constant');
const models = require('./../../../model');
const commonSeed = require('./../../seed/common.seed');

module.exports = () => {

    describe(`createToken`, () => {

        it('should create token', done => {

            // This timeout is set not to get the same token
            setTimeout(() => {

                models.user.createToken(commonSeed.users[0].id)
                    .then(token => {
                        expect(token).toBeTruthy();
                        return models.userToken.findOne({
                            where: {
                                userId: commonSeed.users[0].id,
                                token: token
                            }
                        });
                    })
                    .then(userToken => {
                        expect(userToken).toBeTruthy();
                        done();
                    })
                    .catch(e => {
                        done(e);
                    });

            }, 1000);

        });

    });

};
