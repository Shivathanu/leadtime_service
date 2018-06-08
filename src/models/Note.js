/**
 * Note model
 */
module.exports = function(sequelize, DataTypes) {
    var Note = sequelize.define('Note', {
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
        content: {
            type: DataTypes.TEXT,
            field: 'content'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,    
        tableName: 'lta_note'
    });
    return Note;
};