/**
 * Bom Detail Model
 */
module.exports = function(sequelize, DataTypes) {
    var BomDetail = sequelize.define('BomDetail', {
        bomId: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
            field: 'bom_id'
        },
        createdBy: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'created_by'
        },
        createdByName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: 'created_by_name'
        },
        bomCreatedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'bom_created_date'
        },
        soldToAcc: {
            type: DataTypes.STRING(10),
            field: 'sold_to_acc'
        },
        soldToAccName: {
            type: DataTypes.STRING(135),
            field: 'sold_to_acc_name',
            allowNull: false
        },
        orderNumber: {
            type: DataTypes.STRING,
            field: 'order_number',
            allowNull: false
        },
        customerPOId: {
            type: DataTypes.STRING,
            field: 'customer_purchase_number',
            allowNull: false
        },
        endUserId: {
            type: DataTypes.STRING(30),
            field: 'end_user_id',
            allowNull: true
        },  
        endUserName: {
            type: DataTypes.STRING(80),
            field: 'end_user_name',
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(10),
            field: 'status',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'lta_bom_detail'
    });
    BomDetail.associate = function(models) {
        BomDetail.belongsTo(models.User, {
            foreignKey: 'createdBy',
            targetKey: 'userId',
            onDelete: 'cascade'
        });
        BomDetail.belongsTo(models.EndUser, {
            as: 'endUser',
            foreignKey: 'endUserId',
            targetKey: 'endUserId',
            onDelete: 'cascade'
        });
        BomDetail.hasMany(models.ItemDetail, {
            as: 'itemDetails',
            foreignKey: 'bomId',
            sourceKey: 'bom_id',
            onDelete: 'cascade'
        });
    };
    return BomDetail;
};
