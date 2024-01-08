"use client";
import EditSection from "../components/EditSection";
import HomeButton from "../components/HomeButton";
import withAuth from "../utils/auth";

const Admin = () => {
  return (
    <div className="w-full py-4 flex flex-col gap-3 px-4 sm:px-12 md:px-32 lg:px-8">
      <div className="flex justify-between">
      <HomeButton />
      <h2>Admin Page</h2>
      </div>
      <div className="align-center grid w-full grid-cols-1 justify-center gap-8 py-8 lg:grid-cols-2 xl:grid-cols-3">
        <EditSection sectionId="1" team="1" />
        <EditSection sectionId="2" team="2" />
        <EditSection sectionId="3" team="3" />
      </div>
    </div>
  );
};
export default withAuth(Admin);
