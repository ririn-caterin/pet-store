import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export async function FetchSession() {
  const session = await getServerSession(authOption);
  return session;
}
