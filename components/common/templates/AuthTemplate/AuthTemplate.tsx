import { ReactNode } from "react";
import { Server } from "lucide-react";
import Typography from "../../atoms/Typography/Typography";

interface AuthTemplateProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthTemplate = ({
  title,
  subtitle,
  children,
  footer,
}: AuthTemplateProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
            <Server size={24} className="text-white" />
          </div>
          <div className="text-center">
            <Typography variant="h2">{title}</Typography>
            {subtitle && (
              <Typography variant="body2" color="muted" className="mt-1">
                {subtitle}
              </Typography>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {children}
        </div>

        {footer && (
          <div className="mt-6 text-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTemplate;
export type { AuthTemplateProps };
