import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Projects = sequelize.define('Projects',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment:"id"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:"项目名称"
        },
        icon:{
            type: DataTypes.STRING,
            comment:"项目图标url"
        },
        isdel: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment:"是否已删除"
        }
    },
    {
        freezeTableName: true
    }
)

export default Projects;