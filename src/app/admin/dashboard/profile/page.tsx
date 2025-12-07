'use client';

import ProfileAwards from "@/components/admin/profile/awards";
import ProfileBanner from "@/components/admin/profile/banner";
import ProfileGeneral from "@/components/admin/profile/general";
import ProfilePieChart from "@/components/admin/profile/storage";
// import ProfileActivity from "@/components/admin/profile/RecentActivity"; // nanti bisa aktifkan

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      {/* Top Section: Banner + Pie Chart + Activity */}
      <div className="w-full mt-3 flex flex-col gap-5 lg:grid lg:grid-cols-12">
        {/* Banner */}
        <div className="col-span-12 lg:col-span-4">
          <ProfileBanner />
        </div>

        {/* Pie Chart */}
        <div className="col-span-12 lg:col-span-3">
          <ProfilePieChart />
        </div>

        {/* Activity / Upload */}
        <div className="col-span-12 lg:col-span-5">
          {/* <ProfileActivity /> */}
          {/* <Upload /> */}
        </div>
      </div>

      {/* Bottom Section: Awards + General Info */}
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-12 mb-4">
        {/* Awards */}
        <div className="col-span-12 lg:col-span-6 3xl:col-span-4">
          <ProfileAwards />
        </div>

        {/* General Info */}
        <div className="col-span-12 lg:col-span-6 3xl:col-span-5">
          {/* <ProfileGeneral /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
