import Mongoose from '../../db.js';

const userSchema = new Mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export default Mongoose.model('users', userSchema, 'users');
// o primeiro é o nome do model
//  segundo é o schema em si
// o terceiro é o nome da collection