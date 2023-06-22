import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(user, done) {
    // server to client
    console.log('serializeUser', user);
    done(null, user);
  }
  deserializeUser(payload, done) {
    // client to server
    console.log('deserializeUser', payload);
    done(null, payload);
  }
}
