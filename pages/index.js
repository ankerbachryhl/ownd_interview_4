import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from "axios"
import React from "react"

export default function Home() {
  const [nfts, setNFTS] = React.useState([])

  const handleSearch = async (value) => {
    if (value.length > 3) {

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}?name=${value}`, {
        headers: {
          [process.env.NEXT_PUBLIC_HEADER_KEY]: process.env.NEXT_PUBLIC_HEADER_VALUE
        }
      })
      setNFTS(res.data.collections)
    }
    else {
      setNFTS([])
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>OWND x Rakhat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input type="search" id='myInput' placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
        {nfts.length > 0 &&
          <ul id="myUL" >
            {nfts.map((i) => <li key={i.collectionId}><a href={i.image} target="_blank">{i.name}</a></li>)}
          </ul>
        }
      </main >
    </div >
  )
}
