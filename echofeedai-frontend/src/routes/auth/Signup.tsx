import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { UserInput } from "@/components/self/user-input";
import { useEffect, useState } from "react";
import { SignupPayload, User } from "@/types/user";
import { ActionResult } from "@/types/action-result";
import { toast } from "@/hooks/use-toast";

// toggle group
import { UserCircle2Icon, UserRoundIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Signup() {
  // Action data from -  echofeedai-frontend/src/functions/action/auth/signup.ts
  const navigate = useNavigate();
  const actionData = useActionData<ActionResult<User | SignupPayload>>();
  useEffect(() => {
    if (actionData?.success) {
      toast({
        title: "Signup",
        description: actionData?.message,
        variant: "default",
      });
      navigate("/auth/signin");
    } else if (actionData?.success === false) {
      // origin email
      if (actionData.origin === "email") {
        setError({ type: "email", message: actionData.message });
      } else if (actionData.origin === "password") {
        setError({ type: "password", message: actionData.message });
      } else {
        toast({
          title: "Signup Failed",
          description: actionData?.message,
          variant: "destructive",
        });
      }
    }
  }, [actionData, navigate]);

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("participant");

  // Error state
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to sign up for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="flex flex-col gap-6">
              <ToggleGroup
                type="single"
                variant="outline"
                defaultValue={role}
                value={role}
                onValueChange={(value) => {
                  if (value) {
                    setRole(value);
                  }
                }}
              >
                <ToggleGroupItem
                  value="initiator"
                  aria-label="Toggle initiator"
                >
                  <UserCircle2Icon className="h-4 w-4" /> Initiator
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="participant"
                  aria-label="Toggle participant"
                >
                  <UserRoundIcon className="h-4 w-4" /> Participant
                </ToggleGroupItem>
              </ToggleGroup>
              <div className="grid gap-2">
                <input
                  type="hidden"
                  name="role"
                  value={role || "participant"}
                />
                <UserInput
                  id="email"
                  className="grid gap-2"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={error?.type === "email" ? error.message : ""}
                />
              </div>
              <div className="grid gap-2">
                <UserInput
                  id="name"
                  className="grid gap-2"
                  label="Name"
                  type="text"
                  autoComplete="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <UserInput
                  id="password"
                  className="grid gap-2"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <UserInput
                  id="confirmPassword"
                  className="grid gap-2"
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password !== e.target.value) {
                      setError({
                        type: "password",
                        message: "Passwords do not match",
                      });
                    } else {
                      setError(null);
                    }
                  }}
                  error={error?.type === "password" ? error.message : ""}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link to="/auth/signin" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
