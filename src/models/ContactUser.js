/**
 * ContactUser Model
 */
module.exports = function(sequelize, DataTypes) {
    var ContactUser = sequelize.define('ContactUser', {
        contactUserId: {
            type: DataTypes.STRING(50),
            unique: true,
            field: 'contact_user_id',
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(80),
            field: 'name'
        },
        address: {
            type: DataTypes.TEXT,
            field: 'address'
        },
        city: {
            type: DataTypes.STRING(40),
            field: 'city'
        },
        zip: {
            type: DataTypes.STRING(10),
            field: 'zip'
        },
        state: {
            type: DataTypes.STRING(3),
            field: 'state'
        },
        country: {
            type: DataTypes.STRING(3),
            field: 'country'
        },
        type: {
            type: DataTypes.STRING(20),
            field: 'type'
        },
        emailId: {
            type: DataTypes.STRING(241),
            field: 'email_id'
        },
        homePhoneNumber: {
            type: DataTypes.STRING(30),
            field: 'contact_home'
        },
        mobileNumber: {
            type: DataTypes.STRING(30),
            field: 'contact_mobile'
        },
        officePhoneNumber: {
            type: DataTypes.STRING(30),
            field: 'contact_work'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'lta_contact_user'
    });
    ContactUser.associate = function(models) {
        ContactUser.hasMany(models.BomDetail, {
            foreignKey: 'contactUserId',
            sourceKey: 'contact_user_id',
            onDelete: 'cascade'
        });
    };
    return ContactUser;
};