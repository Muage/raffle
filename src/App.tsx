import { ThemeProvider, createTheme } from '@mui/material';
import MainPage from './views/MainPage'
import Database from '@tauri-apps/plugin-sql';
import { useEffect } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: "arara",
    fontSize: 16,
  },
})

type Classes = {
  id: number,
  name: string
}

function App() {

  async function getClasses() {
    try {
      const db = await Database.load("sqlite:mytestdb.db")
      const dbClasses = await db.select<Classes[]>("SELECT * FROM classes");
      console.log(dbClasses)
    } catch (error) {
      console.log(error)
    }
  }

  async function setClasses(name: string) {
    try {
      const db = await Database.load("sqlite:mytestdb.db")

      await db.execute("INSERT INTO classes (name) VALUES ($1)", [name])
    } catch (error) {
      console.log(error)
    }
  }

  async function removeClasses(id : number) {
    try {
      const db = await Database.load("sqlite:mytestdb.db")

      await db.execute("DELETE FROM classes WHERE id = $1", [id])
    } catch (error) {
      console.log(error)
    }
  }

  async function updateClasses(name: string, id : number) {
    try {
      const db = await Database.load("sqlite:mytestdb.db")

      await db.execute("UPDATE classes SET name = $1 WHERE id = $2", [name, id])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    updateClasses('yes!', 2)
    getClasses()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  )
  
}

export default App
