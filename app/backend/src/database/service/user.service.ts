import User from '../models/UserModel';
import LoginInterface from '../interfaces/login.interface';

export default class UserService {
  findUser = async (username: LoginInterface): Promise<LoginInterface[]> => {
    const user = await User.findOne({ where: { username } });

    if (user) {
      return [user];
    }

    throw new Error('User dont exist');
  };
}
