import jwt from "jsonwebtoken";

export const genToken = async (userID) => {
  try {
    let token = jwt.sign({ userId: userID }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    throw new Error("Could not generate token");
  }
};

export const genToken1 = async (email) => {
  try {
    let token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw new Error("Could not generate token");
  }
};
