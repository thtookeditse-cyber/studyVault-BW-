import { pgTable, text, boolean, timestamp, serial, integer, jsonb } from 'drizzle-orm/pg-core'

// Better Auth tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  phone: text('phone').unique(),
  phoneVerified: boolean('phoneVerified').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  role: text('role').default('user'),
  trialStartedAt: timestamp('trialStartedAt'),
  subscriptionStatus: text('subscriptionStatus').default('trial'),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// App tables
export const examCategories = pgTable('exam_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  categoryId: integer('categoryId').notNull(),
  name: text('name').notNull(),
  code: text('code'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const pastPapers = pgTable('past_papers', {
  id: serial('id').primaryKey(),
  subjectId: integer('subjectId').notNull(),
  year: integer('year').notNull(),
  paperNumber: integer('paperNumber').default(1),
  title: text('title').notNull(),
  pdfUrl: text('pdfUrl').notNull(),
  answersPdfUrl: text('answersPdfUrl'),
  hasAnswers: boolean('hasAnswers').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const assessments = pgTable('assessments', {
  id: serial('id').primaryKey(),
  subjectId: integer('subjectId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull().default('mcq'),
  timeLimitMinutes: integer('timeLimitMinutes'),
  totalMarks: integer('totalMarks').notNull().default(100),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  assessmentId: integer('assessmentId').notNull(),
  questionText: text('questionText').notNull(),
  options: jsonb('options'),
  correctAnswer: text('correctAnswer').notNull(),
  marks: integer('marks').notNull().default(1),
  explanation: text('explanation'),
  questionType: text('questionType').notNull().default('mcq'),
  markingCriteria: text('markingCriteria'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const userAssessmentResults = pgTable('user_assessment_results', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  assessmentId: integer('assessmentId').notNull(),
  score: integer('score').notNull(),
  timeTaken: integer('timeTaken'),
  answers: jsonb('answers').notNull(),
  aiFeedback: jsonb('aiFeedback'),
  completedAt: timestamp('completedAt').notNull().defaultNow(),
})

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  amount: integer('amount').notNull().default(30),
  referenceNumber: text('referenceNumber').notNull(),
  phoneNumber: text('phoneNumber').notNull(),
  status: text('status').notNull().default('pending'),
  verifiedBy: text('verifiedBy'),
  verifiedAt: timestamp('verifiedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
