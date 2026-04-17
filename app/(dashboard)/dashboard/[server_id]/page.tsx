import { Metadata } from "next";
import { notFound } from "next/navigation";
import DashboardTemplate from "@/components/common/templates/DashboardTemplate/DashboardTemplate";
import ServerDetail from "@/components/ui/dashboard/ServerDetail/ServerDetail";
import { getServerById } from "@/integration/service/server.service";

interface ServerDetailPageProps {
  params: Promise<{ server_id: string }>;
}

export async function generateMetadata({
  params,
}: ServerDetailPageProps): Promise<Metadata> {
  const { server_id } = await params;
  try {
    const { data } = await getServerById({ id: server_id });
    return { title: `${data.name} — ServerWatch` };
  } catch {
    return { title: "Server Not Found — ServerWatch" };
  }
}

export default async function ServerDetailPage({ params }: ServerDetailPageProps) {
  const { server_id } = await params;

  let server;
  try {
    const { data } = await getServerById({ id: server_id });
    server = data;
  } catch {
    notFound();
  }

  return (
    <DashboardTemplate>
      <ServerDetail server={server} />
    </DashboardTemplate>
  );
}
