import User from '../models/User';
import { getRepository } from 'typeorm';
import usersRouter from '../routes/users.routes';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password}: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    })

    if(checkUserExists) {
      throw new Error('Email adress already used.')
    }

    const user = usersRepository.create({
      name,
      email,
      password
    })

    await usersRepository.save(user);

    return user;
  }



}

export default CreateUserService;
