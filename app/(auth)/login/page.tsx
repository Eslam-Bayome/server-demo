import { Metadata } from "next";
import AuthTemplate from "@/components/common/templates/AuthTemplate/AuthTemplate";
import { LoginPage } from "@/components/ui/auth";
import Link from "next/link";
import Typography from "@/components/common/atoms/Typography/Typography";

export const metadata: Metadata = {
  title: "Sign In — ServerWatch",
};

export default function page() {
  return (
    <AuthTemplate
      title="Welcome back"
      subtitle="Sign in to your ServerWatch account"
      footer={
        <Typography variant="body2" color="muted">
          Don&apos;t have an account?
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </Typography>
      }
    >
      <LoginPage />
    </AuthTemplate>
  );
}
