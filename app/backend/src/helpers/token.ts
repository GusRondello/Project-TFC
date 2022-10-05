import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class TokenHelper {
  public static create(email: string): string {
    const token = jwt.sign(email, JWT_SECRET);
    return token;
  }

  public static validate(token: string): string {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as string;
    } catch (error) {
      return '';
    }
  }
}
