import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from '../../../components/user/profile/UserInfoCard';
import UserMetaCard from "@/components/user-profile/UserMetaCard";

export default function UserProfilePage() {
  return (
    <div>
      <div className="rounded-2xl border border-zinc-800 bg- p-5 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-[#FFC248] lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          {/* <UserAddressCard /> */}
        </div>
      </div>
    </div>
  );
}
