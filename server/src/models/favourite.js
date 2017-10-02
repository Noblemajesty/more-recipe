
export default (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Favourite.associate = (models) => {
    // associations can be defined here
    Favourite.belongsTo(models.User, { foreignKey: 'userId' });
    Favourite.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
  };
  return Favourite;
};
