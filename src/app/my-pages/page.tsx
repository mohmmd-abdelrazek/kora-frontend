"use client";

import { useLeagues } from "@/src/services/queries";
import withAuth from "@/src/utils/withAuth";

const UserPages = () => {
  const { data: pages, isLoading, error } = useLeagues();

  console.log(pages);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">My Pages</h1>
      <ul>
        {pages?.map((page) => (
          <li key={page.id} className="mb-2">
            <a
              href={`/league/${page.id}`}
              className="text-blue-500 hover:underline"
            >
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(UserPages);
