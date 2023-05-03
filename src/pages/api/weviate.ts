import weaviate, { WeaviateClient } from 'weaviate-ts-client';

// Instantiate the client with the auth config
const client = weaviate.client({
  scheme: 'https',
  host: 'find-the-one-cluster-ob31sefj.weaviate.network',
  apiKey: new weaviate.ApiKey(process.env.WEVIATE_KEY as string),
});

let schema = {
    "classes": [
      {
        "class": "Profile",
        "description": "A person",
        "vectorizer" : "text2vec-openai",
        "vectoriseClassName": true,
        "properties": [
          {
            'dataType': [
                'string'
            ],
            'description': 'The name of the person',
            'name': 'name',
            'vectorizePropertyName': true,
            'index': true
            },
            {
            'dataType': [
                'text'
            ],
            'description': 'The profile description',
            'name': 'description',
            }
        ]
      }
    ]
  }

// Get the schema
async function getSchema() {
  try {
    const res = await client.schema.getter().do();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

// Post a new Schema
async function postSchema(schema: any) {
  try {
    const res = await client
        .schema
        .classCreator()
        .withClass(schema.classes[0])
        .do()
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}


// Create a new Profile
async function createProfile(name: string, description: string) {
  try {
    const res = await client
        .data
        .creator()
        .withClassName('Profile')
        .withProperties({ name, description })
        .do()
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

// Get profiles from Weaviate by description similarity
async function getProfiles(description: string) {
    try {
        const res = await client
            .graphql
            .get()
            .withClassName('Profile')
            .withNearText({concepts: [description]})
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}

createProfile('John Doe', 'A person who likes to code');