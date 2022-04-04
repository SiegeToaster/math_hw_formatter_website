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
        <link rel="icon" href="/icon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Input
        </h1>

        <br></br><br></br>
        <button id="advancedButton" className={styles.center} onClick={() => toggleAdvanced()}>Show Advanced Options</button>
        <br></br>
        <div className={styles.grid}>
          <form action='./formResponse'>
            <label>Name: </label> <input type="text" id="name" name="name"></input>
            <br></br>
            <label>Period: </label> <input type="text" id="periodNumber" name="periodNumber"></input>
            <br></br>
            <label>HW Number: </label> <input type="text" id="hwNumber" name="hwNumber"></input>
            <br></br>
            <label>Number of Pages: </label> <input type="text" id="pages" name="pages"></input>
            <br></br>
            <label id="pageWidth_label" className={styles.hidden}>Page Width (in.): </label> <input type="text" id="pageWidth" name="width" className={styles.hidden}></input>
            <br id="br_1" className={styles.hidden}></br>
            <label id="pageHeight_label" className={styles.hidden}>Page Height (in.): </label> <input type="text" id="pageHeight" name="height" className={styles.hidden}></input>
            <br id="br_2" className={styles.hidden}></br>
            <label id="fontSize_label" className={styles.hidden}>Font Size: </label> <input type="text" id="fontSize" name="fontSize" className={styles.hidden}></input>
            <input type="submit" value="Submit" className={styles.center}></input>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home


function toggleAdvanced(): void {
  const button = document.getElementById("advancedButton")
  if (!button) return
  const buttonText = button.textContent || button.innerText
  const itemsToToggle = [
    "pageWidth_label",
    "pageWidth",
    "br_1",
    "pageHeight_label",
    "pageHeight",
    "br_2",
    "fontSize_label",
    "fontSize",
  ]

  if (buttonText === "Show Advanced Options") {
    itemsToToggle.forEach(itemName => {
      const item = document.getElementById(itemName)
      if (!item) return
      item.style.display = "inline";
    })
    button.innerHTML = "Hide Advanced Options"
  } else if (buttonText === "Hide Advanced Options") {
    itemsToToggle.forEach(itemName => {
      const item = document.getElementById(itemName)
      if (!item) return
      item.style.display = "none";
    })
    button.innerHTML = "Show Advanced Options"
  } else {
    return
  }
}
