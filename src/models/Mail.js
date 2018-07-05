/**
 * Mail model
 */
module.exports = function(sequelize, DataTypes) {
    var Mail = sequelize.define('Mail', {
        userId: {
            type: DataTypes.STRING(50),
            field: 'user_id',
            allowNull: false
        },
        contactUserMailId: {
            type: DataTypes.STRING(50),
            field: 'contact_user_mail_id',
            allowNull: false
        },
        userMailId: {
            type: DataTypes.STRING(50),
            field: 'user_mail_id',
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            field: 'content',
            allowNull: false
        },
        bomId: {
            type: DataTypes.STRING(30),
            field: 'bom_id',
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(10),
            field: 'status'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'lta_mail'
    });
    return Mail;
};