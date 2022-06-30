const expect = require('expect');
const bcrypt = require('bcryptjs');
const { ERROR, CREATION_TYPE } = require('./../../../util/constant');
const models = require('./../../../model');
const commonSeed = require('./../../seed/common.seed');

module.exports = (req, res, next) => {

    describe('createUser', () => {

        it('should create user', done => {

            let user = {
                email: 'dummyemail@gmail.com',
                name: 'dummy name',
                surname: 'dummy surname',
                password: 'dummy password' 
            }

            models.user.createUser(models, commonSeed.users[0].id, user)
                .then(user => {
                    expect(user.name).toBe('dummy name');
                    expect(user.email).toBe('dummyemail@gmail.com');
                    return models.user.findOne({
                        where: {
                            email: user.email,
                            name: user.name,
                            surname: user.surname
                        }
                    });
                })
                .then(user => {
                    expect(user).toBeTruthy();
                    
                    return models.creator.findOne({
                        where: {
                            responsibleId: commonSeed.users[0].id,
                            userId: user.id,
                            type: CREATION_TYPE.CREATE
                        }
                    })
                })
                .then(log => {
                    expect(log).toBeTruthy();
                    done();
                })
                .catch(e => done(e));

        });

    });

};