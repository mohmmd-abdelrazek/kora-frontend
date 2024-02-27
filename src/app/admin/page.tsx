"use client";

import EditSection from "@/src/components/TeamSection";
import HomeButton from "@/src/components/HomeButton";
import withAuth from "@/src/utils/withAuth";
import { useAuth } from "@/src/services/queries";

const Admin = () => {
  const { data } = useAuth();
  console.log(data);
  return (
    <div className="flex w-full flex-col gap-3 px-4 py-4 sm:px-12 md:px-32 lg:px-8">
      <div className="flex justify-between">
        <div>
          <HomeButton />
        </div>
        <h2 className="max-sm:hidden">Admin Page</h2>
      </div>
      <div className="align-center grid w-full grid-cols-1 justify-center gap-8 py-8 max-sm:py-3 lg:grid-cols-2 xl:grid-cols-3">
        <EditSection teamId="1" selectedTeam="1" teamName={""} />
        <EditSection teamId="2" selectedTeam="2" teamName={""} />
        <EditSection teamId="3" selectedTeam="3" teamName={""} />
      </div>
    </div>
  );
};
export default withAuth(Admin);
