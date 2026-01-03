import LoginForm from "@/components/login-form";
import FallBeamBackground from "@/components/ui/fall-beam-background";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div>
      <FallBeamBackground lineCount={62} beamColorClass="blue-400" />
      <div className="min-h-screen w-full px-4 relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg backdrop-blur-lg bg-white/70 relative z-1">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <LoginForm redirect={params?.redirect} />
          </div>
        </div>
      </div>
    </div>

    // <div className="flex min-h-screen items-center justify-center">
    //   <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
    //     <div className="space-y-2 text-center">
    //       <h1 className="text-3xl font-bold">Welcome Back</h1>
    //       <p className="text-gray-500">
    //         Enter your credentials to access your account
    //       </p>
    //     </div>
    //     <LoginForm redirect={params.redirect} />
    //   </div>
    // </div>
  );
};

export default LoginPage;
