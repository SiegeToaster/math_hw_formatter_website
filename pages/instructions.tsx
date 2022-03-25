import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>IDK What I&apos;m Doing</title>
        <meta name="description" content="http://localhost:3000/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Instructions
        </h1>

        <p className={styles.description}>
          Even I do not really know what is going on.
        </p>

        <p>
          Step 1: go to the <a href="./formInput" className={styles.link}>input page</a>.
          <br></br>
          Step 2: Input name, period, homework number, and how many total pages you will need.
          <br></br>
          Step 3: Wait for the pages to load.
          <br></br>
          Step 4: Press the print button in the top right.  Ctrl + P will not work.
        </p>
      </main>
    </div>
  )
}

export default Home
