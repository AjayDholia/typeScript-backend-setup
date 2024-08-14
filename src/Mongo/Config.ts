import mongoose from "mongoose";

const jwtConfig = {
  JWT_PRIVATE_KEY: "shipper",
  EXPIRE_TIME: 24, // HOURS
};

const mongoConnection = (): void => {
  const url =
    "mongodb+srv://user:mTnorYAZfm5t7cst@frienxe.jv5ezxh.mongodb.net/shipper";

  mongoose
    .connect(url, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology : any: true,
    })
    .then(() => {
      console.log("DB connection established!!");
    })
    .catch((err: Error) => {
      console.log("Connection to DB failed");
      console.log(err.message);
    });
};

export { mongoConnection, jwtConfig };
