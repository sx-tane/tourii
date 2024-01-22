import { getUserProfileData } from "@/services/profile.services";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const BungoOno = withPageAuthRequired(async () => {
  const user = await getUserProfileData();

  return (
    <div className="flex flex-col items-center justify-center xl:mx-72 2xl:mx-96">
      BUNGO ONO
    </div>
  );
});

export default BungoOno;
