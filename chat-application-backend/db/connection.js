import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database is connected");
  } catch (error) {
    console.log(`error on connecting to database ${error}`);
  }
};
