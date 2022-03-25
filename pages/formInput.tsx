import type { NextPage } from 'next'
import Head from 'next/head'
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
          Input
        </h1>

       <br></br><br></br>

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
						<label>Number of Pages: </label>
            <input type="text" id="pages" name="pages"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
