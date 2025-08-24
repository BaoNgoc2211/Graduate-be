"use strict";
// // src/config/passport.ts
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import authServices from '../service/auth/auth.services';
// import { IUser } from '../interface/auth/user.interface';
// import { Profile as GoogleProfile } from 'passport-google-oauth20';
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: '/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile: GoogleProfile, done: (error: any, user?: User | false) => void) => {
//       try {
//         const user = await authServices.validateOAuthLogin(profile);
//         done(null, user);
//       } catch (err) {
//         done(err as Error, false);
//       }
//     }
//   )
// );
// // serialize chỉ cái cần thiết (ví dụ: user.id)
// passport.serializeUser((user: IUser, done) => {
//   done(null, user.id);
// });
// // deserialize lấy user từ id
// passport.deserializeUser(async (id: string, done) => {
//   try {
//     // giả sử có hàm tìm user theo id
//     const user = await authServices.findById(id); // bạn cần hiện thực hoặc chuyển xuống repository
//     if (user) {
//       done(null, user);
//     } else {
//       done(new Error('User not found'), null);
//     }
//   } catch (err) {
//     done(err as Error, null);
//   }
// });
