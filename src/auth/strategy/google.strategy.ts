import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Facebook } from '../dto';
// {
//   provider: 'google',
//   sub: '107830410473662953331',
//   id: '107830410473662953331',
//   displayName: undefined,
//   name: { givenName: undefined, familyName: undefined },
//   given_name: undefined,
//   family_name: undefined,
//   email_verified: true,
//   verified: true,
//   email: 'williamnexondv@gmail.com',
//   emails: [ { value: 'williamnexondv@gmail.com', type: 'account' } ],
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
//       type: 'default'
//     }
//   ],
//   picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
//   _raw: '{\n' +
//     '  "sub": "107830410473662953331",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/default-user\\u003ds96-c",\n' +
//     '  "email": "williamnexondv@gmail.com",\n' +
//     '  "email_verified": true\n' +
//     '}',
//   _json: {
//     sub: '107830410473662953331',
//     picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
//     email: 'williamnexondv@gmail.com',
//     email_verified: true
//   }
// }
type IProfile = {
  provider: 'google';
  sub: string;
  id: string;
  displayName?: string;
  name: { givenName?: string; familyName?: string };
  given_name?: string;
  family_name?: string;
  email_verified: boolean;
  verified: boolean;
  email: string;
  emails: { value: string; type: string }[];
  photos: { value: string; type: string }[];
  picture: string;
};
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '341735355294-im65f24m28lkuuq2om1ah6v03f8uvb7g.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3456/auth/google/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: IProfile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, email } = profile;
    const payload: Facebook = {
      email,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };

    done(null, payload);
  }
}
