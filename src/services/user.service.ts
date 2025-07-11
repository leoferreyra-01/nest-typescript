import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  private users: Map<string, UserResponseDto> = new Map();

  constructor() {
    // Initialize with some sample data
    const sampleUsers: UserResponseDto[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02')
      }
    ];

    sampleUsers.forEach(user => this.users.set(user.id, user));
  }

  // GET all users
  findAll(): UserResponseDto[] {
    return Array.from(this.users.values());
  }

  // GET user by ID
  findOne(id: string): UserResponseDto | null {
    return this.users.get(id) || null;
  }

  // POST create new user
  create(createUserDto: CreateUserDto): UserResponseDto {
    const id = Date.now().toString();
    const now = new Date();
    
    const newUser: UserResponseDto = {
      id,
      ...createUserDto,
      createdAt: now,
      updatedAt: now
    };

    this.users.set(id, newUser);
    return newUser;
  }

  // PUT update user (full update)
  update(id: string, updateUserDto: CreateUserDto): UserResponseDto | null {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return null;
    }

    const updatedUser: UserResponseDto = {
      ...existingUser,
      ...updateUserDto,
      updatedAt: new Date()
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // PATCH partial update user
  patch(id: string, updateUserDto: UpdateUserDto): UserResponseDto | null {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return null;
    }

    const updatedUser: UserResponseDto = {
      ...existingUser,
      ...updateUserDto,
      updatedAt: new Date()
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // DELETE user
  remove(id: string): boolean {
    return this.users.delete(id);
  }
} 