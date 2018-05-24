/**
 * User Model
 */
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING,
            field: 'user_id'
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
        },
        middleName: {
            type: DataTypes.STRING,
            field: 'middle_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        fullName: {
            type: DataTypes.STRING,
            field: 'full_name'
        },
        emailId: {
            type: DataTypes.STRING,
            field: 'email_id'
        },
        roleId: {
            type: DataTypes.STRING,
            field: 'role_id',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        timeStamps: true,
        freezeTableName: true,    
        tableName: 'lta_user'
    });
    User.associate = function(models) {
        User.hasMany(models.BomDetail, {
            foreignKey: 'createdBy',
            sourceKey: 'user_id',
            onDelete: 'cascade'
        });
    };
    return User;
};