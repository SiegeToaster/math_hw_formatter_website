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

        <h3>Basic Instructions</h3>
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
          Step 4: Press the print button in the top right.  <b>Ctrl/Cmd + P will not work.</b>
        </p>
        <p>Here&apos;s an example</p>
        <Image src="/instructionsExample.webp" alt="Basic Instructions Example" width="399" height="257"></Image>

        <h3>Advanced Settings</h3>
        <p className={styles.instructions}>
          Step 1: Complete Basic Instructions
          <br></br>
          Step 2: Click &quot;Show Advanced Options&quot;
          <br></br>
          Step 3: Input approximate page width in inches in the form labeled &quot;Page Width (in.).&quot; Anything less than 5 inches will likely not work.  I am not sure what decimal place it is accurate to, but anything more than hundredths is too insignificant to matter anyways. (Default is 8 in.)
          <br></br>
          Step 4: Repeat step 4 but for page height. (Default is 10.5 in.)
          <br></br>
          Step 5: Input font size in the form labeled &quot;Font Size&quot; in points.  The font type is helvetica if you want to do some wacky point to inches conversion.  This may need to be altered if your name does not fit in the alloted 2 inches.  (Default is 14 pt.)
        </p>
      </main>
    </div>
  )
}

export default Home
