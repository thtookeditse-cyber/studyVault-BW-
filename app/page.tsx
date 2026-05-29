import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, GraduationCap, Clock, FileText, Brain, CreditCard, CheckCircle, ArrowRight } from 'lucide-react'

const examCategories = [
  { name: 'PSLE', description: 'Primary School Leaving Examination', color: 'bg-blue-500' },
  { name: 'JCE', description: 'Junior Certificate Examination', color: 'bg-green-500' },
  { name: 'BGCSE', description: 'Botswana General Certificate of Secondary Education', color: 'bg-purple-500' },
  { name: 'IGCSE', description: 'International General Certificate of Secondary Education', color: 'bg-orange-500' },
]

const features = [
  {
    icon: FileText,
    title: 'Past Papers',
    description: 'Access hundreds of past examination papers with marking schemes',
  },
  {
    icon: Brain,
    title: 'AI-Graded Assessments',
    description: 'Get instant feedback on your answers with AI-powered grading',
  },
  {
    icon: Clock,
    title: 'Timed Tests',
    description: 'Practice under exam conditions with countdown timers',
  },
  {
    icon: GraduationCap,
    title: 'All Subjects',
    description: 'Mathematics, English, Science, Agriculture, and more',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="size-5" />
            </div>
            <span className="text-xl font-bold">StudyVault BW</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container relative mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <Clock className="mr-1 size-3" />
            2-Hour Free Trial
          </Badge>
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Ace Your Exams with{' '}
            <span className="text-primary">StudyVault BW</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Access past papers, practice assessments, and get AI-powered feedback for PSLE, JCE, BGCSE, and IGCSE examinations in Botswana.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline">
                I Have an Account
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Only <span className="font-semibold text-foreground">P30/month</span> via Orange Money after trial
          </p>
        </div>
      </section>

      {/* Exam Categories */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Exam Categories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {examCategories.map((exam) => (
              <Card key={exam.name} className="relative overflow-hidden transition-shadow hover:shadow-lg">
                <div className={`absolute left-0 top-0 h-full w-1 ${exam.color}`} />
                <CardHeader>
                  <CardTitle className="text-xl">{exam.name}</CardTitle>
                  <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Our comprehensive platform gives you all the tools to prepare effectively for your exams.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            Simple, Affordable Pricing
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
            Start with a free trial and upgrade when you&apos;re ready
          </p>
          <div className="mx-auto max-w-md">
            <Card className="relative overflow-hidden border-primary">
              <div className="absolute right-4 top-4">
                <Badge>Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Monthly Access</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold">P30</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    '2-hour free trial to start',
                    'All past papers with answers',
                    'AI-graded assessments',
                    'Timed practice tests',
                    'Progress tracking',
                    'Pay via Orange Money',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="size-5 text-accent" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className="w-full gap-2" size="lg">
                    <CreditCard className="size-4" />
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              <span className="font-semibold">StudyVault BW</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Helping Botswana students achieve academic excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
