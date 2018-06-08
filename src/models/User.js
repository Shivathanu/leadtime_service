/**
 * User Model
 */
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING(50),
            field: 'user_id',
            unique: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(20),
            field: 'first_name',
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING(20),
            field: 'middle_name'
        },
        lastName: {
            type: DataTypes.STRING(20),
            field: 'last_name'
        },
        fullName: {
            type: DataTypes.STRING(60),
            field: 'full_name',
            allowNull: false
        },
        emailId: {
            type: DataTypes.STRING(50),
            field: 'email_id',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        }
    }, {
        timestamps: false,
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