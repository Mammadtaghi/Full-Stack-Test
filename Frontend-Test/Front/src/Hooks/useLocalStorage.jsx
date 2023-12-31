import { useEffect, useState } from 'react'

function useLocalStorage(storageName, defaultValue=null) {

    const [data, setData] = useState(localStorage.getItem(`${storageName}`) ? JSON.parse(localStorage.getItem(`${storageName}`)) : defaultValue )

    useEffect(() => {
      localStorage.setItem(`${storageName}`, JSON.stringify(data))
    },[data])

    return [data, setData]
}

export default useLocalStorage