import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getProfiles } from './api/weaviate';
import { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
import React, { FormEvent } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  type Profile = {
    name: string;
    description: string;
  };
  
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);

  const handleSearch = async (event: FormEvent) => {
  event.preventDefault(); // Add this line to prevent default form submission behavior

  if (searchInput) {
    console.log("searchInput"+searchInput);
    try {
      const response = await getProfiles(searchInput);
      if (!response) {
        return;
      }
      console.log("response"+response.data.Get.Profile);
      setSearchResults(response.data.Get.Profile);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("else");
    setSearchResults([]);
  }
};
  
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchInput(query);
  };

  return (
    <>
      <Head>
        <title>Find the One</title>
        <meta name="description" content="Propulsé par Joseph Paris Visuals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for profiles"
              value={searchInput}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>

        <div className={styles.searchResults}>
          {searchResults.map((profile, index) => (
            <div key={index} className={styles.profile}>
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
