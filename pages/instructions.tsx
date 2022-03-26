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
        <link rel="icon" href="/icon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Instructions
        </h1>

        <p className={styles.description}>
          Lost? Confused? So am I.<br></br>Welcome to the instructions page.
        </p>

        <p className={styles.instructions}>
          Step 1: go to the <a href="./formInput" className={styles.link} >input page</a>.
          <br></br>
          Step 2: Input name, period, homework number, and how many total pages you will need.
          <br></br>
          Step 3: Wait for the pages to load.  If it tells you that review problems are needed, then you will need to go to the <a
            href="https://docs.google.com/document/d/1p21l34ih6o_aiOtmaZTnJ-fuXvU9W6nY5ZMDDXGSrYQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            assignments google doc
          </a> to see what is needed.  The same is true for added problems.
          <br></br>
          Step 4: Press the print button in the top right.  Ctrl + P will not work.
        </p>
        <p><br></br>Here&apos;s an example</p>
        <Image src="/instructionsExample.webp" alt="" width="532" height="343"></Image>
      </main>
    </div>
  )
}

export default Home
