import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './entities/user.entity';
import { EntityNotFoundError } from 'src/errors/entity-not-found.error';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Ana',
      email: 'anaclara@gmail.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const currentMaxId = this.users[this.users.length - 1].id || 0;
    const id = currentMaxId + 1;

    const user: User = {
      ...createUserDto,
      id,
    };

    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new EntityNotFoundError(`User with ID ${id} not found`);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) throw new EntityNotFoundError(`User with ID ${id} not found`);

    const newUser: User = {
      ...user,
      ...updateUserDto,
      id: user.id,
    };

    const index = this.users.indexOf(user);
    this.users[index] = newUser;

    return newUser;
  }

  remove(id: number) {
    const user = this.findOne(id);
    if (!user) throw new EntityNotFoundError(`User with ID ${id} not found`);

    const index = this.users.indexOf(user);

    this.users.splice(index, 1);
  }
}
