'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING,
            field: 'user_id'
        },
        userName: {
            type: DataTypes.STRING,
            field: 'user_name'
        },
        emailId: {
            type: DataTypes.STRING,
            field: 'email_id'
        },
    }, {
            underscored: true,
            freezeTableName: true,    
            tableName: 'lta_user'
    });
    User.associate = function(models) {
        User.hasMany(models.BomDetail, {
            foreignKey: 'createdBy',
            sourceKey: 'userId',
            onDelete: 'cascade'
        });
    };
    return User;
};