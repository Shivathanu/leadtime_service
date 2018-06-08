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
            field: 'product_id',
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING(50),
            field: 'product_name',
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(50),
            field: 'description'
        },
        designation: {
            type: DataTypes.STRING(50),
            field: 'designation'
        },
        quantity: {
            type: DataTypes.INTEGER,
            field: 'quantity',
            allowNull: false
        },
        holdDate: {
            type: DataTypes.DATE,
            field: 'hold_date',
            allowNull: true
        },
        prevLeadTime: {
            type: DataTypes.INTEGER,
            field: 'previous_lead_time',
            allowNull: true
        },
        currentLeadTime: {
            type: DataTypes.INTEGER,
            field: 'current_lead_time',
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATE,
            field: 'release_date',
            allowNull: true
        },            
        followUpDate: {
            type: DataTypes.DATE,
            field: 'follow_up_date',
            allowNull: true
        },
        shippingAddress: {
            type: DataTypes.TEXT,
            field: 'shipping_address_detail',
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(20),
            field: 'status',
            allowNull: false
        },
        itemCreatedAt: {
            type: DataTypes.DATE,
            field: 'src_created_at',
            allowNull: false
        },
        shipDate: {
            type: DataTypes.DATE,
            field: 'ship_date',
            allowNull: true
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
    ItemDetail.associate = function(models) {
        ItemDetail.belongsTo(models.BomDetail, {
            foreignKey: 'bomId',
            targetKey: 'bomId',
            onDelete: 'cascade'
        });
    };
    return ItemDetail;
};
