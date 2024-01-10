import UserInfo from "@/components/UserInfo";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const authSession = await getServerAuthSession(); //(1)
  return (
    <>
      <div className="flex items-center justify-center min-h-screen h-fit w-screen relative bg-black text-white">
        {/* <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeo1DwgK7uGeDh3-KUliwRcFHBf14S7KNi0bisvH3PbqpDbtPah5O71221T3Qi-t3SLnQ&usqp=CAU"
          alt="image"
          width={500}
          height={500}
          className="object-contain"
        /> */}
        {authSession?.user && <UserInfo user={authSession?.user} />}
        {!authSession?.user && ( //(3)
          <Link
            className="font-medium mt-2 text-blue-600 hover:underline"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
}
