"use client"

import { FormEvent, useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Signin(){

    const [email, setEmail] = useState('');
    const router = useRouter()

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        await signIn('email', { email, redirect: false,callbackUrl: "/" });
        router.push("/verify-email")
      };
    return(
        <main className="flex min-h-screen flex-col items-center p-24">
      <h1>เข้าสู่ระบบ</h1>
      <p>คุณสามารถเข้าสู่ระบบด้วย email ของ กฟภ. เช่น pattana.vir@pea.co.th</p>
      <p>email อื่นๆ เช่น gmail hotmail yahoo ฯลฯ จะไม่สามารถเข้าสู่ระบบได้</p>
      <p>หากคุณไม่ทราบ Email ของคุณ โปรดตรวจสอบจาก URL: </p>
      <Link href='https://epi.pea.co.th' rel="noopener noreferrer" target="_blank">epi.pea.co.th</Link>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="signin"></label>
        <input onChange={(e)=>setEmail(e.target.value)} type="email" name="signin" required/>
        <button type="submit">ส่ง Email</button>
      </form>
    </main>
    )
}