const expect = require('expect');
const bcrypt = require('bcryptjs');
const { checkFields } = require('./../../util/helper');
const { ERROR, PRIVILEGE, COMPLAINT_EMAIL_USER_TYPE, COMPANY_TICKET_TYPE, 
    TECHNICIAN_DENY_OPTIONS, TECHNICIAN_COMPLETE_OPTIONS } = require('./../../util/constant');

module.exports = () => {

    describe(`checkFields`, () => {

        it('should return fields if fields are correct', (done) => {

            let fieldResult = checkFields({
                name: ' Burak ',
                surname: ' iri   ',
                password: 'ab123457!',
                email: 'dummy@gmail.com',
                model: 'dummy model',
                brand: 'dummy brand',
                gpsId: 'dummy gps id',
                maxVelocity: 30,
                shortName: 'dummy short name',
                city: 'dummy city',
                district: 'dummy district',
                address: 'dummy address',
                latitude: 20.05,
                longitude: 16.16,
                type: 'dummy type',
                year: 2000,
                phone: '905324567896',
                plate: '12 xc 456 ',
                title: 'Müdür',
                version: 'version',
                motorNo: 'motorNo',
                color: 'color',
                chassis: 'chassis',
                warranty: 'warranty',
                fuel: 'fuel',
                deliveryDate: '2019-08-23',
                comment: 'dummy comment',
                startDate: '2019-08-23',
                endDate: '2019-08-23'
            });

            expect(fieldResult.name).toBe('Burak');
            expect(fieldResult.surname).toBe('iri');
            expect(fieldResult.plainPassword).toBe('ab123457!');
            expect(bcrypt.compareSync('ab123457!', fieldResult.password)).toBeTruthy();
            done();

        });

        it('should fail if name is empty', (done) => {

            let fieldResult = checkFields({
                name: ''
            });

            expect(fieldResult.error).toBe(ERROR.NAME_MISSING);
            done();

        });

        it('should fail if surname is empty', (done) => {

            let fieldResult = checkFields({
                surname: ''
            });

            expect(fieldResult.error).toBe(ERROR.SURNAME_MISSING);
            done();

        });

        it('should fail if email is badly formatted', (done) => {

            let fieldResult = checkFields({
                email: 'dummy-email'
            });

            expect(fieldResult.error).toBe(ERROR.BADLY_FORMATTED_EMAIL);
            done();

        });

        it('should fail password if no letter supplied', (done) => {

            const fieldResult = checkFields({
                password: '232123457!'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail password if no symbol supplied', (done) => {

            const fieldResult = checkFields({
                password: '232123457aa'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail password if no digit supplied', (done) => {

            const fieldResult = checkFields({
                password: 'abcdefg!++'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail password if password length is too short', (done) => {

            const fieldResult = checkFields({
                password: 'a1!'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail password if password length is too long', (done) => {

            const fieldResult = checkFields({
                password: 'a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

    });

};
