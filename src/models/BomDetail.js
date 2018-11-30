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
        bomName: {
            type: DataTypes.STRING(999),
            field: 'bom_name'
        },
        createdBy: {
            type: DataTypes.STRING(10),
            field: 'created_by'
        },
        createdByName: {
            type: DataTypes.STRING(200),
            field: 'created_by_name'
        },
        bomCreatedDate: {
            type: DataTypes.DATE,
            field: 'bom_created_date'
        },
        soldToAcc: {
            type: DataTypes.STRING(10),
            field: 'sold_to_acc'
        },
        soldToAccName: {
            type: DataTypes.STRING(300),
            field: 'sold_to_acc_name'
        },
        orderNumber: {
            type: DataTypes.STRING(10),
            field: 'order_number'
        },
        customerPOId: {
            type: DataTypes.STRING(35),
            field: 'customer_purchase_number'
        },
        status: {
            type: DataTypes.STRING(10),
            field: 'status'
        },
        bomUpdatedDate: {
            type: DataTypes.DATE,
            field: 'bom_updated_date'
        },
        bomCreatedAt: {
            type: DataTypes.DATE,
            field: 'src_created_at'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        },
        projectManager: {
            type: DataTypes.STRING(60),
            field: 'project_manager'
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'lta_bom_detail'
    });
    return BomDetail;
};
