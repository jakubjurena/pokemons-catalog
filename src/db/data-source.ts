import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host:
    process.env.APP_ENV === 'docker' ? 'postgres' : process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities:
    process.env.APP_ENV === 'test'
      ? [__dirname + '/../**/*.entity{.ts,.js}']
      : ['dist/src/**/*.entity.js'],
  migrations: [path.join(__dirname, 'migrations', '*.ts')],
};

export default new DataSource(dataSourceOptions);
