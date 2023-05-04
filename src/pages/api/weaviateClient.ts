

import weaviate from 'weaviate-ts-client';



const client = weaviate.client({
    scheme: 'https',
    host: 'find-the-one-cluster-ob31sefj.weaviate.network',
    apiKey: new weaviate.ApiKey(process.env.WEVIATE_KEY as string),
    headers: {'X-OpenAI-Api-Key': process.env.OPENAI_KEY as string},
});

export default client;
