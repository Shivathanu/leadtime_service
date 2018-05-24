'use strict';
module.exports = function(sequelize, DataTypes) {
    var EndUser = sequelize.define('EndUser', {
        endUserId: {
            type: DataTypes.STRING,
            field: 'end_user_id'
        },
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        address: {
            type: DataTypes.TEXT,
            field: 'address'
        },
        city: {
            type: DataTypes.STRING,
            field: 'city'
        },
        zip: {
            type: DataTypes.STRING,
            field: 'zip'
        },
        state: {
            type: DataTypes.STRING,
            field: 'state'
        },
        country: {
            type: DataTypes.STRING,
            field: 'country'
        },
        type: {
            type: DataTypes.STRING,
            field: 'type'
        },
        emailId: {
            type: DataTypes.STRING,
            field: 'email_id'
        },
        homePhoneNumber: {
            type: DataTypes.STRING,
            field: 'contact_home'
        },
        mobileNumber: {
            type: DataTypes.STRING,
            field: 'contact_mobile'
        },
        officePhoneNumber: {
            type: DataTypes.STRING,
            field: 'contact_office'
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
        tableName: 'lta_end_user'
    });
    EndUser.associate = function(models) {
      // associations can be defined here
        EndUser.hasMany(models.BomDetail, {
            foreignKey: 'endUserId',
            sourceKey: 'end_user_id',
            onDelete: 'cascade'
        });
    };
    return EndUser;
};