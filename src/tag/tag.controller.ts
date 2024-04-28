import { Controller, Get } from '@nestjs/common';

@Controller('/tags')
export class TagController {
  @Get()
  findAll() {
    // hardcoded for now, will be replaced with actual data from database later
    return [
      { id: 1, name: 'tag1' },
      { id: 2, name: 'tag2' },
    ];
  }
}
