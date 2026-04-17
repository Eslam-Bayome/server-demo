import { Metadata } from "next";
import AuthTemplate from "@/components/common/templates/AuthTemplate/AuthTemplate";
import Link from "next/link";
import Typography from "@/components/common/atoms/Typography/Typography";
import { SignupPage } from "@/components/ui/auth";

export const metadata: Metadata = {
  title: "Sign Up — ServerWatch",
};

export default function page() {
  return (
    <AuthTemplate
      title="Create account"
      subtitle="Start monitoring your servers in minutes"
      footer={
        <Typography variant="body2" color="muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </Typography>
      }
    >
      <SignupPage />
    </AuthTemplate>
  );
}
