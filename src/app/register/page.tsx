import Link from "next/link";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { FeastForBeastsLogo } from "@/components/icons/logo";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
       <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          src="https://placehold.co/1200x800.png"
          alt="Background image of community members helping each other"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 filter brightness-70"
          data-ai-hint="community help"
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <FeastForBeastsLogo className="h-8 w-auto mr-2 filter brightness-0 invert" />
          {APP_NAME}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;No one has ever become poor by giving.&rdquo;
            </p>
            <footer className="text-sm">Anne Frank</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-primary">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join {APP_NAME} and start making a difference today.
          </p>
        </div>
        <UserAuthForm mode="register" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>
         <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
