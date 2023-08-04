import { Routes, Route, Navigate } from 'react-router-dom'
import { Header, UserProvider } from './components'
import { Home, Login, SignUp, GameHistory, Game } from './pages'

import style from './App.module.css'

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <main className={style.main}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='game-history/:id' element={<GameHistory />} />
            <Route path='game/:id' element={<Game />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>
      </UserProvider>
    </>
  )
}

export default App
