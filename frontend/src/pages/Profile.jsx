import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
export default function Profile() {
    const navigate = useNavigate()
    React.useEffect(() => {
        const x = localStorage.getItem("login")
        if (!x) {
            navigate("/login")
        }

    }, [])

    return (
        <div>Profile</div>
    )
}
