/**
 * ETLJob Model
 */
module.exports = function(sequelize, DataTypes) {
    var ETLJob = sequelize.define('ETLJob', {
        jobName: {
            type: DataTypes.STRING(30),
            field: 'job_name',
            allowNull: false
        },
        lastProcessTime: {
            type: DataTypes.DATE,
            field: 'last_process_time'
        },
        status: {
            type: DataTypes.STRING(20),
            field: 'job_status'
        }
    }, {
        timeStamps: false,
        freezeTableName: true,
        tableName: 'lta_last_process_date'
    });
    return ETLJob;
};