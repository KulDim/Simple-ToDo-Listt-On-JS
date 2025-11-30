import { useState } from "react"


function ListAdd({handlerListadd}){
    const [value, setValue] = useState("")

    function clickadd(){
        setValue("")
        handlerListadd(value)
    }

    return <>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        <button onClick={() => clickadd()}>add</button>
    </>
}

export default ListAdd