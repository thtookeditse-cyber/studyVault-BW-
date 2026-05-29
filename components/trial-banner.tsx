'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, X } from 'lucide-react'

interface TrialBannerProps {
  user: {
    subscriptionStatus?: string | null
    trialStartedAt?: Date | null
  }
}

export function TrialBanner({ user }: TrialBannerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (user.subscriptionStatus === 'active') return

    const trialStart = user.trialStartedAt ? new Date(user.trialStartedAt) : new Date()
    const trialEnd = new Date(trialStart.getTime() + 2 * 60 * 60 * 1000) // 2 hours

    const updateTimer = () => {
      const now = new Date()
      const diff = trialEnd.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining('expired')
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      )
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [user.subscriptionStatus, user.trialStartedAt])

  if (user.subscriptionStatus === 'active' || dismissed) return null

  const isExpired = timeRemaining === 'expired'

  return (
    <div className={`relative px-4 py-2 text-center text-sm ${isExpired ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}>
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Clock className="size-4" />
        {isExpired ? (
          <span>Your trial has expired. Subscribe now to continue learning!</span>
        ) : (
          <span>
            Free trial: <strong>{timeRemaining}</strong> remaining
          </span>
        )}
        <Link href="/dashboard/subscription">
          <Button size="sm" variant={isExpired ? 'secondary' : 'outline'} className="h-7 text-xs">
            {isExpired ? 'Subscribe Now' : 'Upgrade'}
          </Button>
        </Link>
      </div>
      {!isExpired && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
