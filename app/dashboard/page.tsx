import { getExamCategories, getUserResults, getUserSubscriptionStatus, startTrial } from '@/app/actions/content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, FileText, Brain, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const [categories, results, userStatus] = await Promise.all([
    getExamCategories(),
    getUserResults(),
    getUserSubscriptionStatus(),
  ])

  // Start trial if not already started
  if (!userStatus?.trialStartedAt && userStatus?.subscriptionStatus === 'trial') {
    await startTrial()
  }

  const totalAssessments = results.length
  const avgScore = results.length > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)
    : 0

  const categoryColors: Record<string, string> = {
    'PSLE': 'bg-blue-500',
    'JCE': 'bg-green-500',
    'BGCSE': 'bg-purple-500',
    'IGCSE': 'bg-orange-500',
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to StudyVault</h1>
        <p className="text-muted-foreground">Select an exam category to start studying</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{categories.length}</p>
              <p className="text-sm text-muted-foreground">Exam Categories</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Brain className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalAssessments}</p>
              <p className="text-sm text-muted-foreground">Assessments Taken</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
              <TrendingUp className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <FileText className="size-6" />
            </div>
            <div>
              <Badge variant={userStatus?.subscriptionStatus === 'active' ? 'default' : 'secondary'}>
                {userStatus?.subscriptionStatus === 'active' ? 'Subscribed' : 'Trial'}
              </Badge>
              <p className="mt-1 text-sm text-muted-foreground">Subscription</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Categories */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Exam Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/dashboard/papers?category=${category.id}`}>
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <div className={`absolute left-0 top-0 h-full w-1.5 ${categoryColors[category.name] || 'bg-primary'}`} />
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category.name}
                    <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="w-full">
                    Browse Papers
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {results.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                {results.slice(0, 5).map((result) => (
                  <div key={result.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">Assessment #{result.assessmentId}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24">
                        <Progress value={result.score} className="h-2" />
                      </div>
                      <Badge variant={result.score >= 50 ? 'default' : 'destructive'}>
                        {result.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
