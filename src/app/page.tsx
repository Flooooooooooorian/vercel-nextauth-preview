import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center justify-center gap-8 rounded-lg bg-white p-8 dark:bg-zinc-950 shadow-lg">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          NextAuth + GitHub OAuth
        </h1>

        {session ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Logged in as
              </p>
              <p className="text-lg font-semibold text-black dark:text-white">
                {session.user?.name || session.user?.email}
              </p>
            </div>
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="User avatar"
                className="w-16 h-16 rounded-full"
              />
            )}
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-center text-gray-600 dark:text-gray-400">
              You are not signed in
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In with GitHub
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
