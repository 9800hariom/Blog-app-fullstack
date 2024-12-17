import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BlogForm from './Component/BlogForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BlogForm/>
    </>
  )
}

export default App
