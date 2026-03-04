import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-black dark:text-white">
            Dashboard
          </h1>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white dark:bg-zinc-950 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            Welcome, {session.user?.name}!
          </h2>

          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <p className="font-semibold text-black dark:text-white">Email:</p>
              <p>{session.user?.email}</p>
            </div>
            {session.user?.image && (
              <div>
                <p className="font-semibold text-black dark:text-white">
                  Profile Picture:
                </p>
                <img
                  src={session.user.image}
                  alt="User avatar"
                  className="w-24 h-24 rounded-full mt-2"
                />
              </div>
            )}
            <div>
              <p className="font-semibold text-black dark:text-white">
                Session Expires:
              </p>
              <p>
                {session.expires
                  ? new Date(session.expires).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
