import { Encrypter } from '@/data/protocols/criptografy/encrypter'
import { Decrypter } from '@/data/protocols/criptografy/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessTokenm = await jwt.sign({ id: value }, this.secret)
    return accessTokenm
  }

  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }
}
