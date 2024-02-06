import { type UserProfile } from "@/types/interfaceProfile";
import Image from "next/image";
import React from "react";

interface UserProfileCardProps {
  userProfile: UserProfile;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userProfile }) => {
  return (
    <div className="h-4/12 h-[70%]">
      <div className="relative h-1/2 overflow-hidden rounded-t-xl">
        <Image
          src={userProfile.profileImage}
          alt={userProfile.userName}
          width={500}
          height={500}
          className="object-cover shadow-inner"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
        <div className="absolute left-8 top-8 text-xs font-bold uppercase tracking-wider text-red">
          profile
        </div>
        <div className="absolute bottom-8 left-8 text-lg font-bold tracking-wider text-warmGrey">
          {userProfile.userName}
        </div>
      </div>
      <div className="flex h-1/2 flex-col justify-center space-y-5 rounded-b-xl bg-warmGrey pl-10">
        <div className="space-y-1 text-red">
          <div className="text-[10px] font-bold tracking-normal ">
            Registered Name
          </div>
          <div className="text-base font-semibold tracking-wider">
            {userProfile.name}
          </div>
        </div>
        <div className="space-y-1 text-red">
          <div className="text-[10px] font-bold tracking-normal ">
            Residing City
          </div>
          <div className="text-base font-semibold tracking-wider">
            {userProfile.residingCity}
          </div>
        </div>
        <div className="space-y-1 text-red">
          <div className="text-[10px] font-bold tracking-normal ">
            Date of Birth
          </div>
          <div className="text-base font-semibold tracking-wider">
            {userProfile.dateOfBirth}
          </div>
        </div>
        <div className="space-y-1 text-red">
          <div className="text-[10px] font-bold tracking-normal ">
            Email Address
          </div>
          <div className="text-base font-semibold tracking-wider">
            {userProfile.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
