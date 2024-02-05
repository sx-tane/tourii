import UserProfileCard from "@/components/profile/UserProfileCard";
import TravelGoshuinCollection from "@/components/profile/goshuin/TravelGoshuinCollection";
import { profile1 } from "@/lib/data/user/profile1";
import { type NextPage } from "next";

const Profile: NextPage = () => {
  return (
    <div className="absolute right-0 flex h-[90vh] w-[95vw] animate-fadeIn space-x-2 ">
      <div className="flex w-1/4 flex-col space-y-2">
        <UserProfileCard userProfile={profile1} />
        <TravelGoshuinCollection userProfile={profile1} />
      </div>
      <div className="w-3/4 rounded-xl bg-warmGrey">Enter</div>
    </div>
  );
};

export default Profile;
