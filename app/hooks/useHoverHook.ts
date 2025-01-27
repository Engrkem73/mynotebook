
import { useState } from "react";

function useHoverHook(){ //must use useFunction name to create a react custom hook
  const [hover, setHover] = useState(false)
  
  function onHover(){
    setHover(true)
  }

  function onLeave(){
    setHover(false)
  }

  return {
    hover,
    onHover,
    onLeave,
  }
}

export default useHoverHook