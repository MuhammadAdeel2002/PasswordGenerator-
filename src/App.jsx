import { useCallback, useState , useEffect ,useRef} from 'react'



function App() {
   const [length,setLength] = useState(8)
   const [numberAllowed,setNumberAllowed] = useState(false)
   const [charAlllowed,setCharAllowed] = useState(false)
   const [password,setPassword] = useState("")

  //  useref hook use
  const passwordRef = useRef(null)

   const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789";
    if (charAlllowed)  str += "~`!@#$%^&*+_=-[]{}";
   for (let i = 0; i < length; i++) {
    let char =   Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    
   }
    setPassword(pass)
   },[length, numberAllowed, charAlllowed])
   
  const  copyPasswordToClipboard =  useCallback(()=>{
   passwordRef.current?.select()
   passwordRef.current?.setSelectionRange(0,999);
   window.navigator.clipboard.writeText(password)
  },[password])

   useEffect(()=>{
     passwordGenerator()
   },[length, numberAllowed, charAlllowed, passwordGenerator])
 
  return (
    <>
       <div className='w-full max-w-md  mx-auto text-center shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700  '>
        <h1 className='text-white text-2xl text-center'>Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 my-3'>
          <input type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='Password'
           ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-3 shrink-0'>Copy</button>
       </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className=' cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)}}
          />
          <label >Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1' >
          <input
           type="checkbox"
           defaultChecked={numberAllowed}
           id='numberInput'
           onChange={(prev) => {
               setNumberAllowed((prev) => !prev)
           }  }
          
          />
          <label >Add Number</label>
        </div>
        <div className='flex items-center gap-x-1' >
          <input
           type="checkbox"
           defaultChecked={numberAllowed}
           id='numberInput'
           onChange={(prev) => {
               setCharAllowed((prev) => !prev)
           }  }
          
          />
          <label >Add Charactor</label>
        </div>
      </div>

       </div>
    </>
  )
}

export default App
