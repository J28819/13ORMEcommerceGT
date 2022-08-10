// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Product Belongs to Category
Product.belongsTo(Category, {foreignKey: 'category_id'})
// Category has many products
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE'})
// Product belongtomany 
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' }) 
//Product Belong to many tags 
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
