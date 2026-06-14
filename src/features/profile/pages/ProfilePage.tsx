import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useMe } from "@/features/auth/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import type { UserRole } from "@/types/api.types";

interface ProfilePageProps {
  role: UserRole;
}

export default function ProfilePage({ role }: ProfilePageProps) {
  const { data: user, isLoading, isError, refetch } = useMe();

  return (
    <DashboardLayout role={role}>
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-500">Your account information.</p>
        </div>

        {isLoading ? (
          <DetailSkeleton />
        ) : isError ? (
          <PageState type="error" onRetry={() => refetch()} />
        ) : !user ? (
          <PageState type="empty" title="Profile not found" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{user.fullName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Row label="Email" value={user.email} />
              <Row label="Phone" value={user.phone} />
              <Row label="Region" value={user.region} />
              <Row label="Role" value={user.role} />
              <Row label="Member since" value={formatDate(user.createdAt)} />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium capitalize text-slate-900">{value}</span>
    </div>
  );
}
