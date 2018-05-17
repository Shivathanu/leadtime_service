/**
 * Bom Detail Model
 */
module.exports = function(sequelize, DataTypes) {
    var BomDetail = sequelize.define('BomDetail', {
        bomId: {
            type: DataTypes.STRING,
            field: 'bom_id',
            unique: true
        },
        createdBy: {
            type: DataTypes.STRING,
            field: 'created_by'
        },
        createdByName: {
            type: DataTypes.STRING,
            field: 'created_by_name',
        },
        bomCreatedDate: {
            type: DataTypes.DATE,
            field: 'bom_created_date'
        },
        soldToAcc: {
            type: DataTypes.STRING,
            field: 'sold_to_acc'
        },
        soldToAccName: {
            type: DataTypes.STRING,
            field: 'sold_to_acc_name'
        },
        orderNumber: {
            type: DataTypes.STRING,
            field: 'order_number'
        },
        status: {
            type: DataTypes.STRING,
            field: 'status'
        }
    }, {
        underscored: true,
        freezeTableName: true,    
        tableName: 'lta_bom_detail'
    });
    BomDetail.associate = function(models) {
        BomDetail.belongsTo(models.User, {
            foreignKey: 'createdBy',
            targetKey: 'userId',
            onDelete: 'cascade'
        });
        BomDetail.hasMany(models.ItemDetail, {
            foreignKey: 'bomId',
            sourceKey: 'bom_id',
            onDelete: 'cascade'
        });
    };
    return BomDetail;
};
