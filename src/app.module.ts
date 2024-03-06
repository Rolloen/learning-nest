import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { DBModule } from './db/db';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        UsersModule,
        DBModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        AuthModule,
    ],
})
export class AppModule {}
