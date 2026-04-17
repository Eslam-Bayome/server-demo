import { ReactNode } from "react";
import Navbar from "../../organisms/Navbar/Navbar";

interface DashboardTemplateProps {
  children: ReactNode;
  userEmail?: string;
  onLogout?: () => void;
}

const DashboardTemplate = ({
  children,
  userEmail,
  onLogout,
}: DashboardTemplateProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userEmail={userEmail} onLogout={onLogout} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardTemplate;
export type { DashboardTemplateProps };
