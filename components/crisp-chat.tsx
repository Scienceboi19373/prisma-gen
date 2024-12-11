"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"


export default function CrispChat() {
    useEffect(() => {
        Crisp.configure("22b85b17-4f4c-43e4-abe0-8d78be42d25e")
    }, [])

    return null
}