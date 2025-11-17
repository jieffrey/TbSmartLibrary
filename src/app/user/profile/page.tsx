import ProfileCard from "@/components/user/profile/card";
import AccountStats from "@/components/user/profile/stats";
import ProfileActions from "@/components/user/profile/action";

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>

      <ProfileCard />
      <AccountStats />
      <ProfileActions />
    </div>
  );
}
