import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import * as dotenv from "dotenv";
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  

  // Instantiate the client with the auth config
  const client = weaviate.client({
    scheme: 'https',
    host: 'find-the-one-cluster-ob31sefj.weaviate.network',
    apiKey: new weaviate.ApiKey(process.env.WEVIATE_KEY as string),  
  });

  console.log("hello");

  let schema = {
    "classes": [
      {
        "class": "Profile",
        "description": "A person",
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
  /*
  client
  .schema
  .classCreator()
  .withClass(schema.classes[0])
  .do()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });
  */

  client
  .schema
  .getter()
  .do()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });

  return (
    <>
      <Head>
        <title>Find the One</title>
        <meta name="description" content="Propulsé par Joseph Paris Visuals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
       
      </main>
    </>
  )
}
