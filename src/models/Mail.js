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
        receiverId: {
            type: DataTypes.STRING(50),
            field: 'receiver_id',
            allowNull: false
        },
        messageId: {
            type: DataTypes.STRING,
            field: 'message_id',
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