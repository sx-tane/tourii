import { useUser } from "@auth0/nextjs-auth0/client";

const Beta = ({ textColor }: { textColor: string }) => {
  const { user } = useUser();
  return (
    <div>
      {user && (
        <div
          className={`mt-1 rounded-lg border font-semibold border-${textColor} px-2 py-1 text-xs font-semibold uppercase text-${textColor} cursor-default tracking-wider`}
        >
          Beta V0.0.1
        </div>
      )}
    </div>
  );
};

export default Beta;
