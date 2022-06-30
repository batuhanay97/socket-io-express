module.exports = (sequelize, DataTypes) => {

    // Model configuration
	let UnseenMessage = sequelize.define('unseenMessage', {
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        message: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.STRING
        }
    });

	// Model association
	UnseenMessage.associate = (models) => {
        UnseenMessage.belongsTo(models.user, { as: 'user', onDelete: 'cascade' });
	};
    
	// Return model
	return UnseenMessage;

}