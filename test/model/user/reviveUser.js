const expect = require('expect');
const models = require('./../../../model');
const commonSeed = require('./../../seed/common.seed');
const userSeed = require('./../../seed/user.seed');
const { CREATION_TYPE, USER_TYPE } = require('../../../util/constant');

module.exports = () => {

    describe(`updateUser`, () => {

        it('should update the user', done => {

            // Check if seed is proper
            expect(userSeed.users[2]).toBeTruthy();
            expect(commonSeed.users[0].companyId).toBe(commonSeed.dealers[0].companyId);

            let updateObject = {
                deletedAt: null,
                password: 'dummy-password0',
                email: userSeed.users[2].email,
                name: 'dummy name',
                surname: 'dummy surname',
                type: USER_TYPE.DEALER_ADMIN,
                requestSourceId: commonSeed.users[0].requestSourceId,
                companyId: commonSeed.users[0].companyId,
                dealerId: commonSeed.dealers[0].id
            }

            models.user.reviveUser(models, commonSeed.users[0].id, userSeed.users[2].id, updateObject) 
                .then(user => {

                    expect(user.name).toBe(updateObject.name);
                    expect(user.type).toBe(USER_TYPE.DEALER_ADMIN);
                    expect(user.deletedAt).toBeFalsy();

                    return models.user.findOne({
                        where: updateObject
                    });

                })
                .then(user => {

                    expect(user).toBeTruthy();

                    return models.creator.findOne({
                        where: {
                            responsibleId: commonSeed.users[0].id,
                            userId: userSeed.users[2].id,
                            type: CREATION_TYPE.CREATE
                         }
                    });

                })
                .then(creator => {
                    expect(creator).toBeTruthy();
                    done();
                })
                .catch(err => {
                    done(err);
                });


        });

    });

}