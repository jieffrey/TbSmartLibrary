'use client';

import ProfileAwards from "@/components/admin/profile/awards";
import ProfileBanner from "@/components/admin/profile/banner";
import ProfileGeneral from "@/components/admin/profile/general";
import ProfilePieChart from "@/components/admin/profile/storage";
import ProfileActivity from '../../../../components/admin/profile/RecentActivity';

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <ProfileBanner/>
        </div>

        <div className="col-span-3 lg:!mb-0">
          <ProfilePieChart/>
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <ProfileActivity/>
          {/* <Upload /> */}
        </div>
      </div>
      {/* all project & ... */}

      <div className="mb-4 grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <ProfileAwards/>
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <ProfileGeneral/>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
