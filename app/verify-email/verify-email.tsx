import Link from 'next/link'

export default function VerifyEmail(){
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p> โปรดตรวจสอบ email กฟภ. ของคุณโดยคุณสามารถเข้าได้ตาม URL นี้</p>
            <Link href="https://email.pea.co.th" rel="noopener noreferrer" target="_blank">email.pea.co.th</Link>
        </main>
    )
}