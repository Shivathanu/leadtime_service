/**
 * Transaction Log Model
 */
module.exports = function(sequelize, DataTypes) {
    var TransactionLog = sequelize.define('TransactionLog', {
        userId: {
            type: DataTypes.STRING(50),
            field: 'user_id',
            allowNull: false
        },
        bomId: {
            type: DataTypes.STRING(30),
            field: 'bom_id',
            allowNull: false
        },
        itemId: {
            type: DataTypes.STRING(6),
            field: 'item_id',
            allowNull: false
        },
        holdDate: {
            type: DataTypes.DATE,
            field: 'hold_date',
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            field: 'address',
        },
        releaseConfirmDate: {
            type: DataTypes.DATE,
            field: 'release_confirm_date',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false
        }
    }, {
        timeStamps: true,
        freezeTableName: true,
        tableName: 'lta_transaction_log'
    });
    return TransactionLog;
};