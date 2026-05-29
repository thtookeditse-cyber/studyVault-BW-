'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { examCategories, subjects, pastPapers, assessments, userAssessmentResults, payments, user } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getExamCategories() {
  return db.select().from(examCategories).orderBy(examCategories.name)
}

export async function getSubjectsByCategory(categoryId: number) {
  return db.select().from(subjects).where(eq(subjects.categoryId, categoryId)).orderBy(subjects.name)
}

export async function getPapersBySubject(subjectId: number) {
  return db.select().from(pastPapers).where(eq(pastPapers.subjectId, subjectId)).orderBy(desc(pastPapers.year))
}

export async function getPaperById(paperId: number) {
  const result = await db.select().from(pastPapers).where(eq(pastPapers.id, paperId)).limit(1)
  return result[0] || null
}

export async function getAssessmentsBySubject(subjectId: number) {
  return db.select().from(assessments).where(eq(assessments.subjectId, subjectId)).orderBy(assessments.title)
}

export async function getAssessmentById(assessmentId: number) {
  const result = await db.select().from(assessments).where(eq(assessments.id, assessmentId)).limit(1)
  return result[0] || null
}

export async function getUserResults() {
  const userId = await getUserId()
  return db
    .select()
    .from(userAssessmentResults)
    .where(eq(userAssessmentResults.userId, userId))
    .orderBy(desc(userAssessmentResults.completedAt))
}

export async function submitPayment(referenceNumber: string, phoneNumber: string) {
  const userId = await getUserId()
  
  await db.insert(payments).values({
    userId,
    amount: 30,
    referenceNumber,
    phoneNumber,
    status: 'pending',
  })
  
  revalidatePath('/dashboard/subscription')
  return { success: true }
}

export async function getUserPayments() {
  const userId = await getUserId()
  return db
    .select()
    .from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(desc(payments.createdAt))
}

export async function getUserSubscriptionStatus() {
  const userId = await getUserId()
  const result = await db.select().from(user).where(eq(user.id, userId)).limit(1)
  return result[0] || null
}

export async function startTrial() {
  const userId = await getUserId()
  
  await db
    .update(user)
    .set({ 
      trialStartedAt: new Date(),
      subscriptionStatus: 'trial'
    })
    .where(eq(user.id, userId))
  
  revalidatePath('/dashboard')
  return { success: true }
}
