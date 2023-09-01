import { useCallback, useEffect, useRef, useState } from 'react'
import './style.css'
function App() {
  const [length, setlength] = useState(8)
  const [NumberAllowed, setNumberAllowed] = useState(false)
  const [CharactersAllowed, setCharactersAllowed] = useState(false)
  const [password, setpassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (NumberAllowed) str += "0123456789"
    if (CharactersAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, NumberAllowed, CharactersAllowed, setpassword])

  const CopytoClickBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 11)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, NumberAllowed, CharactersAllowed, passwordGenerator])

  return (
    <>
       <h1 align="center" className='my-5' style={{ textDecoration: 'underline'}}>Password Generator</h1>
    <div className="container d-flex justify-content-center my-4 ">
        <input type="text" className='bg-light text-dark' readOnly value={password} placeholder='Password' ref={passwordRef} />
        <button className='btn bg-primary my-3' onClick={CopytoClickBoard}>COPY</button>
    </div>
    <div className="container d-flex justify-content-center my-4 flex-wrap">
        <input className='mx-2' style={{width:'20%'}} type="range" min={6} max={20} value={length} onChange={(e) => { setlength(e.target.value) }} />
        <label>Length: {length}</label>
    </div>
    <div className="container d-flex justify-content-center flex-wrap">
        <input type="checkbox" defaultChecked={NumberAllowed} className='mx-2' onChange={() => setNumberAllowed((prev) => !prev)} style={{ cursor: 'pointer' }} />Number
        <input type="checkbox" defaultChecked={NumberAllowed} className='mx-2' onChange={() => setCharactersAllowed((prev) => !prev)} style={{ cursor: 'pointer' }} />Characters
    </div>
    </>
  )

}

export default App
