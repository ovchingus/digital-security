'use strict';
module.exports = (sequelize, DataTypes) => {

	/**
	 * Author model
	 */
	const author = sequelize.define('author', {
		author_id: {allowNull: false, primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
		name: DataTypes.STRING,
		description: DataTypes.STRING
	}, {freezeTableName: true, timestamps: false});

	/**
	 * For associations
	 */
	author.associate = models => {
	};

	return author;
};