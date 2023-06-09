const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    image:{
     type: DataTypes.STRING,
    },
    height:{
      type:DataTypes.STRING,
    },
    weight:{
      type:DataTypes.STRING,
    },
    life_span:{
      type:DataTypes.STRING,
    }
  });
};
