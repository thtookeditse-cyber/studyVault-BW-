import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/dashboard-nav'
import { TrialBanner } from '@/components/trial-banner'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <TrialBanner user={session.user} />
      <DashboardNav user={session.user} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
