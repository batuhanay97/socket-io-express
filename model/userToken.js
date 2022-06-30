module.exports = (sequelize, DataTypes) => {

    // Model configuration
	let UserToken = sequelize.define('userToken', {
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        token: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.STRING
        }
    }, {
        indexes: [
            {
              unique: true,
              fields: ['token']
            }
        ]
    });

	// Model association
	UserToken.associate = (models) => {
        UserToken.belongsTo(models.user, { as: 'user', onDelete: 'cascade' });
	};
    
	// Return model
	return UserToken;

}