import React from 'react'
import { useNavigate } from "react-router-dom"
export default function Admin({ element }) {
    const navigate = useNavigate()
    const x = localStorage.getItem("login")
    const localData = JSON.parse(localStorage.getItem("login"))
    React.useEffect(() => {
        if (!x || !localData?.isAdmin) {
            navigate("/login")
        }
    }, [])
    if (!x || !localData?.isAdmin) {
        return "You are not Authorized."
    }

    return element
}
