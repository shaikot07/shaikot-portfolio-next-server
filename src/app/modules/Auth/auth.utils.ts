import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  console.log('Creating token with payload:', jwtPayload);
  console.log('Using secret:', secret);
  console.log('Token expires in:', expiresIn);
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
