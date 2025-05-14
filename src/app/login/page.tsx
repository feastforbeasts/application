import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { FeastForBeastsLogo } from "@/components/icons/logo";
import { APP_NAME } from "@/lib/constants";

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://placehold.co/1200x800.png?text=Food+Donation')",
            filter: 'brightness(0.7)' 
          }}
          data-ai-hint="food donation volunteers"
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <FeastForBeastsLogo className="h-8 w-auto mr-2 filter brightness-0 invert" />
          {APP_NAME}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;The best way to find yourself is to lose yourself in the service of others.&rdquo;
            </p>
            <footer className="text-sm">Mahatma Gandhi</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-primary">
            Welcome Back!
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to access your account.
          </p>
        </div>
        <UserAuthForm mode="login" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
