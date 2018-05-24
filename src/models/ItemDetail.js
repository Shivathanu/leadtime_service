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
        bomId: {
            type: DataTypes.STRING,
            field: 'bom_id'
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
        description: {
            type: DataTypes.STRING,
            field: 'descripion'
        },
        designation: {
            type: DataTypes.STRING,
            field: 'designation'
        },
        holdDate: {
            type: DataTypes.DATE,
            field: 'hold_date'
        },
        prevLeadTime: {
            type: DataTypes.INTEGER,
            field: 'previous_lead_time'
        },
        currentLeadTime: {
            type: DataTypes.INTEGER,
            field: 'current_lead_time',
        },
        releaseDate: {
            type: DataTypes.DATE,
            field: 'release_date'
        },        
        followUpDate: {
            type: DataTypes.DATE,
            field: 'follow_up_date',
        },
        shippingAddress: {
            type: DataTypes.TEXT,
            field: 'shipping_address_detail'
        },
        status: {
            type: DataTypes.STRING,
            field: 'status'
        },
        itemCreatedAt: {
            type: DataTypes.DATE,
            field: 'src_created_at'
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
