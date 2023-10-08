'use client'
import styles from './page.module.css'
import { TextField } from '@mui/material'

export default function SinglePageApp() {  
  return (
    <main className={styles.main}>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </main>
  )
}
