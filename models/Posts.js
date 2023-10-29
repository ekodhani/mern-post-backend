module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    // sequelize telah menyediakan column default: id, datetime
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // membuat relasi 1 to m dari table Posts ke table Comments
  // relasi 1 to m dari table Posts ke table Likes
  // relasi antar table di Sequelize disebut dengan Associate
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
