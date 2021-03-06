module.exports = {

    AVAILABLE_VERSIONS: ['v1'], // Available REST service versions

    ENVIRONMENT: {
        TEST: 'test',
        DEVELOPMENT: 'development',
        PRODUCTION: 'production'
    },

    LANGUAGES : ['en', 'tr'],

    DEFAULT_LANGUAGE : 'tr',

    TIMEOUT: {
        REQUEST: 10 * 1000, // in miliseconds
    },

    CONSTANT: {
        HASH_SALT: 10,
        CUSTOMER_TICKET_ID_OFFSET: 1000
    },

    PHONE_VERIFICATION: {
        CODE_LENGTH: 6,
        CODE_REQUEST_INTERVAL: 30, // in seconds
        MAX_TRIAL_COUNT: 5,
        MAX_BLOCK_COUNT: 5,
        MAX_CODE_REQUEST_COUNT: 10
    },

    CREATION_TYPE: {
        DELETE: 0,
        CREATE: 1
    },

    EXPIRATION: {
        JWT_TOKEN: 60 * 60, // in seconds
        TOKEN_IN_DATABASE: 1, // in days
    },

    // Response headers
    HEADER: {
        AUTHENTICATION: 'x-auth',
        TECHNICIAN_AUTHENTICATION: 'x-tech-auth',
        LANGUAGE: 'x-lang'
    },

    RESPONSE_STATUS: {
        FAIL: 'Fail',
        SUCCESS: 'Success'
    },

    RESPONSE_TYPE: {
        FILE: 'File'
    },

    LIMIT: {
        MIN_PASSWORD_CHAR_COUNT: 6,
        MAX_PASSWORD_CHAR_COUNT: 32,
        MAXIMUM_AVATAR_SIZE: 2 * 1024 * 1024, // in bytes
        MAXIMUM_AVATAR_SIZE_TEST: 1024, // in bytes
        MAXIMUM_IMAGE_SIZE: 2 * 1024 * 1024, // in bytes
        MAXIMUM_IMAGE_SIZE_TEST: 1024, // in bytes
        MAXIMUM_IMAGE_UPLOAD_FOR_TECHNICIAN_ARRIVE: 10,  // piece
        MAXIMUM_IMAGE_UPLOAD_FOR_TECHNICIAN_COMPLETE: 10  // piece
    },

    PAGINATION: {
        DEFAULT_TICKET_PAGE_SIZE: 10,
        MAXIMUM_TICKET_PAGE_SIZE: 50,
        DEFAULT_JOB_PAGE_SIZE: 10,
        MAXIMUM_JOB_PAGE_SIZE: 50,
        DEFAULT_OLD_JOB_PAGE_SIZE: 10,
        MAXIMUM_OLD_JOB_PAGE_SIZE: 50,
        DEFAULT_TECHNICIAN_AVATAR_REQUEST_PAGE_SIZE: 25,
        MAXIMUM_TECHNICIAN_AVATAR_REQUEST_PAGE_SIZE: 300
    },

    REQUEST_STATUS: {
        PENDING: 'pending',
        DECLINED: 'declined',
        ACCEPTED: 'accepted'
    },

    SOCKET: {
        CONNECTION: 'connection',
        ONLINE: 'online',
        DISCONNECT: 'disconnect',
        MESSAGE: 'message',
        SEETHEMESSAGE: 'seeTheMessage',
        GETUNSEENMESSAGES: 'getUnseenMessages'
    },

    // Errors
    ERROR: {

        AUTHENTICATION_FAILED: {
            code: 1000,
            message :{
                tr: 'L??ften sisteme giri?? yap??n',
                en: 'Please login to the system'
            }
        },
        SHORT_PASSWORD: {
            code: 1001,
            message: {
                tr: '??ifre ??ok k??sa',
                en: 'Password is too short'
            }
        },
        LONG_PASSWORD: {
            code: 1002,
            message: {
                tr: '??ifre ??ok uzun',
                en: 'Password is too long'
            }
        },
        BADLY_FORMATTED_EMAIL: {
            code: 1003,
            message: {
                tr: 'Ge??ersiz bir email adresi girdiniz',
                en: 'You entered an invalid email address'
            }
        },
        USER_ALREADY_EXISTS: {
            code: 1004,
            message: {
                tr: 'Bu kullan??c?? halihaz??rda mevcut',
                en: 'This user already exists'
            }
        },
        DEALER_NOT_FOUND: {
            code: 1005,
            message: {
                tr: 'Sat??c?? bulunamad??',
                en: 'Dealer not found'
            }
        },
        MISSING_FIELDS: {
            code: 1006,
            message: {
                tr: 'Baz?? alanlar eksik',
                en: 'Some fields are missing'
            }
        },
        USER_NOT_FOUND: {
            code: 1007,
            message: {
                tr: 'Kullan??c?? bulunamad??',
                en: 'User not found'
            }
        },
        INCORRECT_CREDENTIALS: {
            code: 1008,
            message: {
                tr: 'E-posta veya ??ifre yanl????',
                en: 'Email or password is incorrect'
            }
        },
        AUTHORIZATION_FAILED: {
            code: 1011,
            message: {
                tr: 'Bu eylem i??in yetkiniz yok',
                en: 'You are not authorized for this action'
            }
        },
        NAME_MISSING: {
            code: 1020,
            message: {
                tr: 'L??tfen isim giriniz',
                en: 'Please provide a name'
            }
        },
        SURNAME_MISSING: {
            code: 1021,
            message: {
                tr: '',
                en: 'Please provide a surname'
            }
        },
        PASSWORD_MISSING: {
            code: 1022,
            message: {
                tr: 'L??tfen soyisim giriniz',
                en: 'Please provide a password'
            }
        },
        BAD_FORMAT_PHONE: {
            code: 1023,
            message: {
                tr: 'L??tfen do??ru bir telefon numaras?? giriniz',
                en: 'Please provide a correct phone number'
            }
        },
        INVALID_PASSWORD: {
            code: 1123,
            message: {
                tr: '??ifreniz en az 8 karakterden olu??mal??d??r. ????erisinde en az bir k??????k harf, bir sembol bir de rakam bulunmald??r',
                en: 'Your password should be at least 8 character long. Also, it must include one lowercase character, one digit and one symbol'
            }
        },
        PHONE_MISSING: {
            code: 1053,
            message: {
                tr: 'L??tfen ge??erli bir telefon numaras?? giriniz',
                en: 'Please provide a valid phone'
            }
        },
        IMAGE_UPLOAD_FAILED: {
            code: 1103,
            message: {
                tr: 'Resim y??klenirken hata olu??tu',
                en: 'Failed while uploading the image'
            }
        },
        INCORRECT_FILE_TYPE: {
            code: 1104,
            message: {
                tr: 'Ge??ersiz dosya format??',
                en: 'Invalid file format'
            }
        },
        IMAGE_TOO_LARGE: {
            code: 1105,
            message: {
                tr: 'L??tfen daha k??????k bir boyutta resim y??kleyin',
                en: 'Please upload a smaller image in size'
            }
        },
        INCORRECT_FIELD_NAME: {
            code: 1106,
            message: {
                tr: 'Hatal?? alan ad??',
                en: 'Incorrect field name'
            }
        },
        INCORRECT_USER_TYPE: {
            code: 1107,
            message: {
                tr: 'Bu kullan??c?? i??in bu i??lemi yapamazs??n??z',
                en: 'The process cannot be done for this user'
            }
        },
        STATUS_MISSING: {
            code: 1142,
            message: {
                tr: 'Durum bilgisi eksik',
                en: 'Please provide a status'
            }
        },
        FRIEND_REQUEST_NOT_FOUND: {
            code: 1143,
            message: {
                tr: 'Arkada??l??k iste??i bulunamad??',
                en: 'Friend request not found'
            }
        },
        REQUEST_ALREADY_EXISTS: {
            code: 1144,
            message: {
                tr: 'Bu istek halihaz??rda mevcut',
                en: 'This request already exists'
            }
        },
        CAN_NOT_REQUEST: {
            code: 1145,
            message: {
                tr: 'Bu istek yap??lamaz',
                en: 'This request can not be done'
            }
        },
        UNKNOWN: {
            code: 3000,
            message: {
                tr: 'Bilinmeyen bir hata',
                en: 'Unknown error'
            }
        },
        INTERNAL_SERVER_ERROR: {
            code: 4000,
            message: {
                tr: 'Sunucu hatas??',
                en: 'Internal server error'
            }
        }
    }

};
