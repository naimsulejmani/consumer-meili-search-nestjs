import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';
import { consumers } from './data/data';
import { IConsumer } from './data/consumer.interface';
import { Consumer } from './data/consumer.dto';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('')
  public async refreshConsumerDocumentList() {
    for (const consumer of consumers) {
      const iConsumer = consumer as IConsumer;
      const con = new Consumer();
      con.ID = iConsumer.ID;
      con.Name = iConsumer.Name;
      con.Address = iConsumer.Address;
      con.Place = iConsumer.Place;
      con.Active = iConsumer.Active;
      con.City = iConsumer.City;
      await this.searchService.addDocuments(con);
    }
  }

  @Get('/{text}')
  public async searchConsumer(@Param('text') text: string) {
    return await this.searchService.search(text, {
      limit: 10,
      attributesToHighlight: ['*'],
    });
  }
}
