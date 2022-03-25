import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
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
          A Very Interesting Title To This Loading Page
        </h1>

        <div className={styles.grid}>
          <Script id='tempFix' >{`var exports = {};`}</Script> {/* ToDo: Find a not stupid fix */}
          <Script src="/responseScript.js" />
          <p id="testThing" className={styles.description}>Please Wait...</p>
        </div>

        <button id="okayButton" className={styles.hiddenButton} >Okay.</button>
      </main>
    </div>
  )
}

export default Home
