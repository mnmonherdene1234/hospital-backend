import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserSchema, Role } from '../../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('Create Admin and Worker', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI, {
          dbName: process.env.DATABASE_NAME,
        }),
        MongooseModule.forFeature([
          { name: User.schemaName, schema: UserSchema },
        ]),
      ],
      providers: [UsersService],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
  });

  describe('CREATE', () => {
    it('Create Admin', async () => {
      const createUserDto: CreateUserDto = new CreateUserDto();
      createUserDto.first_name = 'Овог';
      createUserDto.last_name = 'Нэр';
      createUserDto.username = 'admin';
      createUserDto.password = 'adminpassword';
      createUserDto.role = Role.Admin;
      createUserDto.profile_img =
        'https://d1pspl52z5rk07.cloudfront.net/assets/production/app/default/avatar-13e49413d14d7528c1dba3d70cb39957e4aa4b997dff5cf4cd6c89992da9aaa5.png';
      createUserDto.email = 'username@gmail.com';
      createUserDto.phone = '85368385';
      expect(await userService.create(createUserDto)).toBeDefined();
    });

    it('Create Worker', async () => {
      const createUserDto: CreateUserDto = new CreateUserDto();
      createUserDto.first_name = 'Овог';
      createUserDto.last_name = 'Нэр';
      createUserDto.username = 'worker';
      createUserDto.password = 'workerpassword';
      createUserDto.role = Role.Worker;
      createUserDto.profile_img =
        'https://d1pspl52z5rk07.cloudfront.net/assets/production/app/default/avatar-13e49413d14d7528c1dba3d70cb39957e4aa4b997dff5cf4cd6c89992da9aaa5.png';
      createUserDto.email = 'username@gmail.com';
      createUserDto.phone = '85368385';
      expect(await userService.create(createUserDto)).toBeDefined();
    });
  });
});
