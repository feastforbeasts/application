
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useProfile, type UserProfileData } from "@/contexts/profile-context"; // Import useProfile

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  name: z.string().optional(), 
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: "login" | "register";
}

export function UserAuthForm({ className, mode, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { profile, updateProfile } = useProfile(); // Get profile context

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(data: UserFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    setIsLoading(false);

    if (mode === "login") {
      // On login, update email. Keep existing name and avatar if they exist,
      // otherwise, use a default name.
      const newProfileData: Partial<UserProfileData> = {
        email: data.email,
        // If profile.name is not the default "Donor User" or empty, keep it. Otherwise, provide a generic "User".
        // This logic might need refinement based on how "default" is determined.
        name: (profile.name && profile.name !== "Donor User") ? profile.name : (data.name || "User"), 
        avatarUrl: profile.avatarUrl || "/images/user-avatar.jpg", // Keep existing or default avatar
      };
      updateProfile(newProfileData);
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      router.push("/dashboard");
    } else { // Register mode
      updateProfile({ 
        name: data.name || "New User", // Use entered name or a default
        email: data.email,
        avatarUrl: "/images/user-avatar.jpg" // Default avatar on registration
      });
      toast({
        title: "Registration Successful (Simulated)",
        description: "In a real app, an email would be sent to verify your account. Redirecting to login.",
      });
      router.push("/login");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {mode === "register" && (
            <div className="grid gap-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="px-1 text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
          )}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="px-1 text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode === "login" && (
                 <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              disabled={isLoading}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="px-1 text-xs text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading} className="w-full mt-2">
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  );
}
