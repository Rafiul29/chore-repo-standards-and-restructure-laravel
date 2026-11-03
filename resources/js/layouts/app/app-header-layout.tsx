import { AppContent } from '@/components/dashboard/app-content';
import { AppHeader } from '@/components/dashboard/app-header';
import { AppShell } from '@/components/dashboard/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
