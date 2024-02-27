"use client";
import Link from "next/link";
import { useAuth } from "../services/queries";

const LandingPage = () => {
  const { data, isLoading, error } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <div className="w-full py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {data?.isAuthenticated ? (
          <div>
            <h1 className="mb-4 text-4xl">مرحبا, {data.user.name}!</h1>
            <div className="flex gap-4 justify-center items-center">
              <Link
                href="/create"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                أنشئ صفحة
              </Link>
              <Link
                href="/my-pages"
                className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
              >
                دورياتي
              </Link>
            </div>
          </div>
        ) : (
          <h1 className="text-6xl font-bold">
            انضم <a className="text-blue-600">لدوري</a>
          </h1>
        )}

        <p className="mt-3 text-2xl">
          {data?.isAuthenticated
            ? "ابدأ بإنشاء صفحاتك الآن."
            : "قم بتسجيل الدخول لإنشاء صفحتك"}
        </p>
        <p className="mt-2 text-lg text-gray-600">
          قم بإنشاء وإدارة صفحاتك بسهولة
        </p>
      </main>
    </div>
  );
};

export default LandingPage;
