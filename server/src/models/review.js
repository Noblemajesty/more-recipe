
export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Review.belongsTo(models.Recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
  };
  return Review;
};
