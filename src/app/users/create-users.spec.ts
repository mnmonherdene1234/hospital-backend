import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('Create Admin and Worker', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
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
      createUserDto.username = 'admin';
      createUserDto.password = 'adminpassword';
      createUserDto.role = 'ADMIN';
      createUserDto.profile_img =
        'https://d1pspl52z5rk07.cloudfront.net/assets/production/app/default/avatar-13e49413d14d7528c1dba3d70cb39957e4aa4b997dff5cf4cd6c89992da9aaa5.png';
      expect(await userService.create(createUserDto));
    });
  });
});
