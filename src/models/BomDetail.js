/**
 * Bom Detail Model
 */
module.exports = function(sequelize, DataTypes) {
    var BomDetail = sequelize.define('BomDetail', {
        bomId: {
            type: DataTypes.STRING,
            field: 'bom_id'
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
        }
    }, {
        underscored: true,
        freezeTableName: true,    
        tableName: 'lta_bom_detail'
    });
    return BomDetail;
};