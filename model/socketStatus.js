module.exports = (sequelize, DataTypes) => {

    // Model configuration
	let SocketStatus = sequelize.define('socketStatus', {
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        status: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.ENUM(['online', 'disconnect'])
        },
        socketId: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.STRING
        }
    });

	// Model association
	SocketStatus.associate = (models) => {
        SocketStatus.belongsTo(models.user, { as: 'user', onDelete: 'cascade' });
	};
    
	// Return model
	return SocketStatus;

}