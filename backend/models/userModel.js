import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);
//update set pass roi moi .save() nen ismodified = true
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // nếu password chưa thay đổi
    // vd update user nhưng ko update password
    next();
  } else {

    //hash pass khi update hoặc create password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);
// mongoose auto set User to users by this rule or you can put your customn collection name in third parameter
export default User;
