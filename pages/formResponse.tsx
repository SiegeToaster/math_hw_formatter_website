import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test 2</title>
        <meta name="description" content="http://localhost:3000/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Test 2
        </h1>

        <p className={styles.description}>
          It will be a miracle if this works.
        </p>

        <div className={styles.grid}>
          <Script id='tempFix' >{`var exports = {};`}</Script> {/* ToDo: Find a not stupid fix */}
          <Script src="/responseScript.js" />
          <p id="testThing">Please Wait...</p>
        </div>
      </main>
    </div>
  )
}

export default Home
