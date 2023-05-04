import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import getConfig from 'next/config';
import * as dotenv from 'dotenv';

const { publicRuntimeConfig } = getConfig();
//const client = require('./weaviateClient');
//require('dotenv').config();
//const weaviate = require('weaviate-ts-client');
// Instantiate the client with the auth config


const client = weaviate.client({
  scheme: 'https',
  host: 'find-the-one-cluster-ob31sefj.weaviate.network',
  apiKey: new weaviate.ApiKey(process.env.NEXT_PUBLIC_WEVIATE_KEY as string),
  headers: { 'X-OpenAI-Api-Key':process.env.NEXT_PUBLIC_OPENAI_KEY as string},
});

let a = 2;



let schema = {
    "classes": [
    {
      "class": "Profile",
      "description": "Object of type Profile",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text"
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "The profile name",
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "profileName"
        },
        {
          "dataType": [
            "text"
          ],
          "description": "The description of the profile",
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "profileDescription",
        },
      ]
    }
  ]
  }

// Get the schema
export async function getSchema() {
  try {
    const res = await client.schema.getter().do();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

// Post a new Schema class type
export async function postClassToSchema(schema: any) {
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

//delete class type from schema
export async function deleteClassFromSchema(classname: string) {
  try {
    const res = await client
        .schema
        .classDeleter()
        .withClassName(classname)
        .do()
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}


// Delete object from schema
export async function deleteObjectFromSchema(schema: any) {
  try {
    const res = await client
        .data.deleter()
        .withClassName(schema.classes[0].class)
        .do()
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}


// Create a new Profile
export async function createProfile(name: string, description: string) {
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
export async function getProfiles(description: string, limit: number = 10) {
    try {
        const res = await client
            .graphql
            .get()
            .withClassName('Profile')
            .withFields('description')
            .withNearText({concepts: [description]})
            .withLimit(limit)
            .do()
        return res;
    } catch (err) {
        console.error(err);
    }
}



console.log("hello world" + a);


async function main() {
  try {
    const schema = await getSchema();
    console.log("schema", schema);
  } catch (err) {
    console.error(err);
  }
  console.log("hello world");
}

main();
