import { Controller, Get } from '@nestjs/common';

@Controller('type')
export class TypeController {
  @Get()
  findAll() {
    return ['Grass', 'Fire', 'Water'];
  }
}
