require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  // Para DB deploy. Suelen pedir conexión ssl.
  dialectOptions: {
    ssl: true
  },
  define: {
    freezeTableName: true // Para que no le cambie el nombre a todas las tablas
  }
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Review, User, Brand, Type, Storage, Address, Ram, Cart, Order, Product_cart, Product_order } = sequelize.models;

// Aca vendrian las relaciones
Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Address);
Address.belongsTo(User)

Brand.hasMany(Product);
Product.belongsTo(Brand);

Type.hasMany(Product);
Product.belongsTo(Type);

Storage.hasMany(Product);
Product.belongsTo(Storage);

Ram.hasMany(Product);
Product.belongsTo(Ram);

Product.belongsToMany(Cart, {through: Product_cart}); //N to N relation stablished
Cart.belongsToMany(Product, {through: Product_cart});

Product.belongsToMany(Order, {through: Product_order}); //N to N relation stablished
Order.belongsToMany(Product, {through: Product_order});

User.hasOne(Cart, {
  foreignKey: { // No puede existir carrito sin usuario.
    allowNull: false
  }
}); 
Cart.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Address.belongsToMany(Order, {through: 'order_address'});
Order.belongsToMany(Address, {through: 'order_address'});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Op
};

