import { IUser } from './userInterface';

export default interface IJwt {
  createToken(data: IUser): string;
}
