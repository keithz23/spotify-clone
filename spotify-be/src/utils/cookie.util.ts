import { Response } from 'express';
export class Cookie {
  static setCookie({
    name,
    data,
    res,
  }: {
    name: string;
    data: string;
    res: Response;
  }) {
    res.cookie(name, data, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
    });
  }

  static clearCookie({ name, res }: { name: string; res: Response }) {
    res.clearCookie(name, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }

}
