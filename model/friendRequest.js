module.exports = (sequelize, DataTypes) => {

    // Model configuration
	let FriendRequest = sequelize.define('friendRequest', {
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        status: {
            allowNull: false,
            notEmpty: true,
            type: DataTypes.ENUM(['pending', 'declined', 'accepted'])
        },
    });

	// Model association
	FriendRequest.associate = (models) => {
        FriendRequest.belongsTo(models.user, { as: 'creator', onDelete: 'cascade' });
        FriendRequest.belongsTo(models.user, { as: 'receiver', onDelete: 'cascade' });
	};
    
	// Return model
	return FriendRequest;

}