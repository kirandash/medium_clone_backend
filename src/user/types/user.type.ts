import { Users } from '@app/user/user.entity';

export type UserType = Omit<Users, 'hashPassword'>;
