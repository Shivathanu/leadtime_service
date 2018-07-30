/**
 * Item Detail Model
 */
module.exports = function(sequelize, DataTypes) {
    var ItemDetail = sequelize.define('ItemDetail', {
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
        productId: {
            type: DataTypes.STRING(50),
            field: 'product_id'
        },
        productName: {
            type: DataTypes.STRING(50),
            field: 'product_name'
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'description'
        },
        designation: {
            type: DataTypes.STRING(100),
            field: 'designation'
        },
        quantity: {
            type: DataTypes.INTEGER,
            field: 'quantity'
        },
        holdDate: {
            type: DataTypes.DATEONLY,
            field: 'hold_date'
        },
        prevLeadTime: {
            type: DataTypes.INTEGER,
            field: 'previous_lead_time'
        },
        currentLeadTime: {
            type: DataTypes.INTEGER,
            field: 'current_lead_time',
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATEONLY,
            field: 'release_date'
        },            
        followUpDate: {
            type: DataTypes.DATEONLY,
            field: 'follow_up_date'
        },
        shippingAddress: {
            type: DataTypes.TEXT,
            field: 'shipping_address_detail'
        },
        status: {
            type: DataTypes.STRING(10),
            field: 'status'
        },
        itemCreatedAt: {
            type: DataTypes.DATE,
            field: 'src_created_at'
        },
        shipDate: {
            type: DataTypes.DATEONLY,
            field: 'ship_date'
        },
        bomUpdatedDate: {
            type: DataTypes.DATE,
            field: 'bom_updated_date'
        },
        parentId: {
            type: DataTypes.STRING(6),
            field: 'parent_id'
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'created_at'
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'lta_item_detail'
    });
    return ItemDetail;
};
