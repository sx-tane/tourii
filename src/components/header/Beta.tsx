import { useUser } from "@auth0/nextjs-auth0/client";

const Beta = ({ textColor }: { textColor: string }) => {
  const { user } = useUser();
  return (
    <div>
      {user && (
        <div
          className={`rounded-lg border-[1.5px] font-semibold border-${textColor} p-2 text-[10px] font-semibold uppercase text-${textColor} cursor-default tracking-wider`}
        >
          Beta V0.0.1
        </div>
      )}
    </div>
  );
};

export default Beta;
