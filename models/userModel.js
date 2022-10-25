import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
});

// Adding a new User to the System

userSchema.statics.addUser = async function addUser(
  userName,
  email,
  password,
  role,
  mobile_number
) {
  //valdidate the Input.
  if (!email || !password || !userName || !role || !mobile_number) {
    throw Error("Please Fill all the Fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please provide a Valid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Please provide a Strong password.");
  }

  if (!validator.isMobilePhone(mobile_number, "bn-BD")) {
    throw Error("Please Provide a Valid Mobile Number.");
  }
  //validation

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email Already In Use.");
  }

  const userNameExists = await this.findOne({ userName });

  if (userNameExists) {
    throw Error("Username already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    userName,
    email,
    password: hashedPassword,
    role,
    mobile_number,
  });

  return user;
};

//Break

// Removing a User from the System

userSchema.statics.removeUser = async function removeUser(email) {
  //Delete the User that matches with the Email.

  const deleted = await this.deleteOne({ email });

  if (deleted.deletedCount != 1) {
    throw Error("This user Doesn't Exist.");
  }

  if (!deleted.acknowledged) {
    throw Error(
      "Something Went Wrong while deleting the User, Please try Again."
    );
  }

  return { status: true, message: "The User was Successfully Removed" };
};

//Break

// Static Login method

userSchema.statics.login = async function login(email, password) {
  //valdidate the Input.
  if (!email || !password) {
    throw Error("Both Field is Required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please provide a Valid Email");
  }
  //validation

  const user = await this.findOne({ email });

  if (!user) {
    throw Error(
      "This User doesn't Exist. Please Check your Email and password"
    );
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid Password, Try Again.");
  }

  return user;
};

//export the User Model

export default mongoose.model("User", userSchema);
