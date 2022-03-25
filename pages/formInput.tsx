import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test 1</title>
        <meta name="description" content="http://localhost:3000/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Test 1
        </h1>

        <p className={styles.description}>
          It will be a miracle if this works.
        </p>

        <div className={styles.grid}>
          <form action='./formResponse'>
            <label>Name: </label>
            <input type="text" id="name" name="name"></input>
            <br></br>
            <label>Period: </label>
            <input type="text" id="periodNumber" name="periodNumber"></input>
            <br></br>
            <label>HW Number: </label>
            <input type="text" id="hwNumber" name="hwNumber"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
