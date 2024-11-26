import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const user = await getServerSession(authOption);
  console.log(user);

  return (
    <div>
      <div className="p-5">
        <Link
          href="/api/auth/signin"
          className="bg-blue-500 text-white px-3 py-1"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Page;
