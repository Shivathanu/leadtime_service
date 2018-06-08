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
        endUserMailId: {
            type: DataTypes.STRING(50),
            field: 'end_user_mail_id',
            allowNull: false
        },
        userMailId: {
            type: DataTypes.STRING(50),
            field: 'user_mail_id',
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            field: 'content'
        },
        bomId: {
            type: DataTypes.STRING(30),
            field: 'bom_id',
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(10),
            field: 'status',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'lta_mail'
    });
    return Mail;
};