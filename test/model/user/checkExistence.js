const expect = require('expect');
const uuidv4 = require('uuid/v4');
const { ERROR, USER_TYPE } = require('./../../../util/constant');
const models = require('./../../../model');
const commonSeed = require('./../../seed/common.seed');

module.exports = () => {

    describe(`checkExistence`, () => {

        it('should find user', done => {

            expect(commonSeed.users[0].companyId).toBe(commonSeed.users[1].companyId);

            models.user.checkExistence(commonSeed.users[0].id, commonSeed.users[0].companyId, {
                    type: commonSeed.users[0].type,
                    include: ['company']
                })
                .then(user => {
                    expect(user).toBeTruthy();
                    expect(user.company.id).toBeTruthy();
                    done();
                })
                .catch(e => {
                    done(e);
                });
        });

        it('should find user without options', done => {

            expect(commonSeed.users[0].companyId).toBe(commonSeed.users[1].companyId);

            models.user.checkExistence(commonSeed.users[0].id, commonSeed.users[0].companyId)
                .then(user => {
                    expect(user).toBeTruthy();
                    done();
                })
                .catch(e => {
                    done(e);
                });

        });

        it('should not find user if user not found', done => {

            models.user.checkExistence(uuidv4(), commonSeed.tickets[0].companyId)
                .then(() => {
                    done('An error is expected');
                })
                .catch(e => {
                    expect(e.code).toBe(ERROR.USER_NOT_FOUND.code);
                    done();
                });
                
        });

        it('should not find user if company id is different', done => {

            expect(commonSeed.users[0].companyId).not.toBe(commonSeed.companies[1].id);

            models.user.checkExistence(commonSeed.users[0].id, commonSeed.companies[1].id)
                .then(() => {
                    done('An error is expected');
                })
                .catch(e => {
                    expect(e.code).toBe(ERROR.USER_NOT_IN_YOUR_COMPANY.code);
                    done();
                });

        });

        it('should not find user if type is incorrect', done => {

            expect(commonSeed.users[0].type).not.toBe(USER_TYPE.OPERATOR);

            models.user.checkExistence(commonSeed.users[0].id, commonSeed.companies[0].id, {
                    type: USER_TYPE.OPERATOR
                })
                .then(() => {
                    done('An error is expected');
                })
                .catch(e => {
                    expect(e.code).toBe(ERROR.INCORRECT_USER_TYPE.code);
                    done();
                });

        });

    });
};