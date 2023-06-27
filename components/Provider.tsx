"use client"
import { SessionProvider } from 'next-auth/react'

interface sessionProviderProps{
  children: React.ReactNode
  session?: any //FIXME
}

const Provider : React.FC<sessionProviderProps> = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
