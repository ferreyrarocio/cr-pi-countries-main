const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      difficulty: { type: DataTypes.INTEGER, allowNull: false, validate: {
          min: 1,
          max: 5,
        },
      },
      duration: { type: DataTypes.INTEGER, allowNull: true, validate: {
          min: 1,
          max: 12,
        }, 
      },
      season: {
        type: DataTypes.ENUM("verano", "otoño", "invierno", "primavera"), allowNull: false },
    },
    { timestamps: false }
  );
};
