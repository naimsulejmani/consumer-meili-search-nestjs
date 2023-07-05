import { Injectable } from '@nestjs/common';
import MeiliSearch, { Index, SearchParams } from 'meilisearch';

@Injectable()
export class SearchService {
    private _client: MeiliSearch;
    constructor() {
        this._client = new MeiliSearch({
            host: '127.0.0.1:7700/',
            apiKey: 'SUp3rK3y123$'
        });
    }

    private getConsumerIndex(): Index {
        return this._client.index('consumers');
    }

    public async addDocuments(documents) {
        const index = this.getConsumerIndex();
        return await index.addDocuments(documents);
    }


    public async search(text: string, searchParams?: SearchParams) {
        const index = this.getConsumerIndex();
        return await index.search(text, searchParams);
    }
    
}
