import { AuthGuard } from "@/components/auth-guard";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <AuthGuard>{children}</AuthGuard>
    </div>
  );
}
