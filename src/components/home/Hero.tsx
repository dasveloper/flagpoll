import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero my-4 rounded-xl bg-base-200 py-12">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Feature flags made easy</h1>
          <p className="py-6">
            Go to production without worry. Flagpoll allows you to quickly and
            easily toggle features on and off without needing to redeploy your
            code.
          </p>
          <Link href="/dashboard" className="btn-primary btn">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
