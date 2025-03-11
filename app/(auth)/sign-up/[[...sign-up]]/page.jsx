import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='h-screen flex  justify-center p-10'>
        <SignUp />
    </div>
  )
}