module.exports = (sequelize, DataTypes) => {

    // Model configuration
	let User = sequelize.define('user', {
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        email: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.STRING
        },
        surname: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        indexes: [
            {
              unique: true,
              fields: ['email']
            }
        ]
    });

    // Define methods
    require('./method/user')(User);

	// Model association
	User.associate = (models) => {
        User.hasMany(models.userToken, { as: 'userTokens', onDelete: 'cascade' });
        User.hasMany(models.friendRequest, { as: 'creator', onDelete: 'cascade' });
        User.hasMany(models.friendRequest, { as: 'receiver', onDelete: 'cascade' });
        User.hasOne(models.socketStatus, { as: 'socketStatus', onDelete: 'cascade' });
        User.hasMany(models.unseenMessage, { as: 'unseenMessages', onDelete: 'cascade' });
    };
    
	// Return model
	return User;

}