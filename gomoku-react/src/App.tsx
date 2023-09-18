import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components'
import { Home, Login, SignUp, Game, GameHistory, GameLogPreview } from './pages'

import style from './App.module.css'

function App() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='game-history' element={<GameHistory />} />
          <Route path='game-log/:id' element={<GameLogPreview />} />
          <Route path='game' element={<Game />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
