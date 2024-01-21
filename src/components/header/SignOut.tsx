import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignOut = ({
  textColor,
  hoverTextColor,
}: {
  textColor: string;
  hoverTextColor: string;
}) => {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <button
      className={`mr-5 rounded-lg border-[1.5px] border-${textColor} px-2 py-1 text-xs font-semibold uppercase text-${textColor} transition-all duration-300 hover:bg-${textColor} hover:text-${hoverTextColor}`}
      onClick={() => signOut(() => router.push("/"))}
    >
      Sign out
    </button>
  );
};

export default SignOut;
