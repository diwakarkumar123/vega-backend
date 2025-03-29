const { Sequelize, DataTypes } = require('sequelize');
const { sq } = require('../Config/db');
const UserSection = require('./UserSection'); // Import UserSection model

const Blog = sq.define('blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: true
});

// Define Associations
UserSection.hasMany(Blog, { foreignKey: 'user_id', onDelete: 'CASCADE' }); 
Blog.belongsTo(UserSection, { foreignKey: 'user_id' }); 

module.exports = Blog;
