import { getServerSession } from "next-auth";
import { authOption } from "@/app/config/authOptions";

export async function FetchSession() {
  const session = await getServerSession(authOption);
  return session;
}
