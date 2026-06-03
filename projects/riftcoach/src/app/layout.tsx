import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/app/theme-provider'
import { AppShell } from '@/components/app/app-shell'
import { PageTransition } from '@/components/app/page-transition'

export const metadata: Metadata = {
  title: 'RiftCoach',
  description: 'Wild Rift AI Coach — draft, builds, tier list, and climbing tools.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppShell>
            <PageTransition>{children}</PageTransition>
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
