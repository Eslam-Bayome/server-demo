"use client";

import { Server, LogOut, User } from "lucide-react";
import Button from "../../atoms/Button/Button";
import Typography from "../../atoms/Typography/Typography";

interface NavbarProps {
  userEmail?: string;
  onLogout?: () => void;
}

const Navbar = ({ userEmail, onLogout }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Server size={16} className="text-white" />
          </div>
          <Typography variant="h4" className="text-gray-900">
            ServerWatch
          </Typography>
        </div>

        {userEmail && (
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <User size={14} className="text-gray-600" />
              </div>
              <Typography variant="caption" color="muted">
                {userEmail}
              </Typography>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="gap-1.5"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
export type { NavbarProps };
