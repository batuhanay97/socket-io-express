const multer = require('multer');
const path = require('path');
const { ERROR, RESPONSE_STATUS, LIMIT, ENVIRONMENT } = require('../util/constant');

const avatarCheck = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {

        // Get file type
        var ext = path.extname(file.originalname);

        // Return error if not an image
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback({
                data: ERROR.INCORRECT_FILE_TYPE,
                message: `Avatar not uploaded for auth: ${req.auth}`,
                status: RESPONSE_STATUS.FAIL
            });
        }

        // Correct image type
        callback(null, true);

    },
    limits: {
        fileSize: process.env.NODE_ENV === ENVIRONMENT.TEST ? LIMIT.MAXIMUM_AVATAR_SIZE_TEST : LIMIT.MAXIMUM_AVATAR_SIZE
    }
}).single('avatar');

const excelCheck = multer({
    storage: multer.diskStorage({
        // destination: function (req, file, cb) {
        //     cb(null, '/tmp/uploads');
        // },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now());
        }
    }),
    fileFilter: (req, file, callback) => {

        // Get file type
        var ext = path.extname(file.originalname);

        // Return error if not an image
        if (ext !== '.xlsx') {
            return callback({
                data: ERROR.INCORRECT_FILE_TYPE,
                message: `Avatar not uploaded for auth: ${req.auth}`,
                status: RESPONSE_STATUS.FAIL
            });
        }

        // Correct image type
        callback(null, true);

    }
}).single('excel');

const imagesCheck = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {

        // Get file type
        var ext = path.extname(file.originalname);

        // Return error if not an image
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback({
                data: ERROR.INCORRECT_FILE_TYPE,
                message: `Image not uploaded for auth: ${req.auth}`,
                status: RESPONSE_STATUS.FAIL
            });
        }

        // Correct image type
        callback(null, true);

    },
    limits: {
        fileSize: process.env.NODE_ENV === ENVIRONMENT.TEST ? LIMIT.MAXIMUM_IMAGE_SIZE_TEST : LIMIT.MAXIMUM_IMAGE_SIZE
    }
}).array('images');

module.exports = { avatarCheck, excelCheck, imagesCheck };
