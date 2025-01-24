export const cookieConfig = {
  refreshToken: {
    name: 'refreshToken',
    options: {
      path: '/',
      httpOnly: true,
      sameSite: 'strict' as 'strict',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  },
};
