import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userType: "admin" | "user";
  userStatus: "active" | "inactive";
}

// Define the User Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    userStatus: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  {
    timestamps: true,
  }
);

// Create the model using the interface and schema
const Users = mongoose.model<IUser>("User", UserSchema);

export default Users;
