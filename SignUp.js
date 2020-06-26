import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const SignUpSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    }
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('SignUp', SignUpSchema);