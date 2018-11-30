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
            field: 'first_name'
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
            field: 'full_name'
        },
        emailId: {
            type: DataTypes.STRING(50),
            field: 'email_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        employeeId: {
            type: DataTypes.STRING(15),
            field: 'employee_id'
        }
    }, {
        timestamps: false,
        freezeTableName: true,    
        tableName: 'lta_user'
    });
    return User;
};