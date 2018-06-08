/**
 * EndUser Model
 */
module.exports = function(sequelize, DataTypes) {
    var EndUser = sequelize.define('EndUser', {
        endUserId: {
            type: DataTypes.STRING(50),
            unique: true,
            field: 'end_user_id',
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(20),
            field: 'name',
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            field: 'address',
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(40),
            field: 'city',
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING(10),
            field: 'zip',
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(3),
            field: 'state',
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(3),
            field: 'country',
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(20),
            field: 'type'
        },
        emailId: {
            type: DataTypes.STRING(241),
            field: 'email_id',
            allowNull: false
        },
        homePhoneNumber: {
            type: DataTypes.STRING(30),
            field: 'contact_home'
        },
        mobileNumber: {
            type: DataTypes.STRING(30),
            field: 'contact_mobile',
            allowNull: false
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
        tableName: 'lta_end_user'
    });
    EndUser.associate = function(models) {
        EndUser.hasMany(models.BomDetail, {
            foreignKey: 'endUserId',
            sourceKey: 'end_user_id',
            onDelete: 'cascade'
        });
    };
    return EndUser;
};