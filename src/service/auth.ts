import { UserModel } from "@model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  public async signup(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    return this.getAuthTokens({ userId: newUser.id });
  }

  public async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw Error("Invalid credentials");
    }

    return this.getAuthTokens({ userId: user.id });
  }

  private getAuthTokens(payload: { userId: string }) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  public async refresh(refreshToken: string) {
    const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as {
      userId: string;
    };
    return this.getAuthTokens({ userId: token.userId });
  }
}

export const authService = new AuthService();
