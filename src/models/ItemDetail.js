/**
 * Item Detail Model
 */
module.exports = function(sequelize, DataTypes) {
    var ItemDetail = sequelize.define('ItemDetail', {
        itemId: {
            type: DataTypes.STRING,
            field: 'item_id',
            unique: true
        },
        productId: {
            type: DataTypes.STRING,
            field: 'product_id',
        },
        productName: {
            type: DataTypes.STRING,
            field: 'product_name',
        },
        quantity: {
            type: DataTypes.INTEGER,
            field: 'quantity',
        },
        followUpDate: {
            type: DataTypes.DATE,
            field: 'follow_up_date',
        },
        leadTime: {
            type: DataTypes.INTEGER,
            field: 'lead_time',
        },
        scheduledDate: {
            type: DataTypes.DATE,
            field: 'scheduled_request_date'
        },
        bomId: {
            type: DataTypes.STRING,
            field: 'bom_id'
        },
        status: {
            type: DataTypes.STRING,
            field: 'status'
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
        tableName: 'lta_item_detail'
    });
    ItemDetail.associate = function(models) {
        ItemDetail.belongsTo(models.BomDetail, {
            foreignKey: 'bomId',
            targetKey: 'bomId',
            onDelete: 'cascade'
        });
    };
    return ItemDetail;
};
