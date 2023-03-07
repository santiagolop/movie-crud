import { UserModel } from "@model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  private JWT_SECRET = process.env.JWT_SECRET;
  public async signup(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return jwt.sign({ userId: newUser.id }, this.JWT_SECRET, {
      expiresIn: "1y",
    });
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw Error("Invalid credentials");
    }

    return jwt.sign({ userId: user.id }, this.JWT_SECRET, {
      expiresIn: "1y",
    });
  }
}

export const authService = new AuthService();
