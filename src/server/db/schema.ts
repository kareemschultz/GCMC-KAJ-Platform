import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  varchar,
  uuid,
  jsonb,
  index,
  unique
} from "drizzle-orm/pg-core"

// Base fields for all tables
const baseFields = {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}

// User and Authentication Tables
export const users = pgTable("users", {
  ...baseFields,
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  avatar: text("avatar"),
  role: varchar("role", { length: 50 }).notNull().default("viewer"),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  organizationId: uuid("organization_id").references(() => organizations.id),
}, (table) => ({
  emailIdx: index("users_email_idx").on(table.email),
  organizationIdx: index("users_organization_idx").on(table.organizationId),
}))

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
}, (table) => ({
  userIdx: index("sessions_user_idx").on(table.userId),
}))

// Organization and Multi-tenancy
export const organizations = pgTable("organizations", {
  ...baseFields,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  logo: text("logo"),
  website: text("website"),
  industry: varchar("industry", { length: 100 }),
  companySize: varchar("company_size", { length: 50 }),
  country: varchar("country", { length: 100 }).notNull().default("Guyana"),
  settings: jsonb("settings").default({}),
  subscriptionTier: varchar("subscription_tier", { length: 50 }).default("starter"),
  isActive: boolean("is_active").notNull().default(true),
}, (table) => ({
  slugIdx: index("organizations_slug_idx").on(table.slug),
}))

// Client Management
export const clients = pgTable("clients", {
  ...baseFields,
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  type: varchar("type", { length: 50 }).notNull(), // individual, company
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  companyName: varchar("company_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  tinNumber: varchar("tin_number", { length: 50 }),
  nisNumber: varchar("nis_number", { length: 50 }),
  address: jsonb("address").default({}),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  riskLevel: varchar("risk_level", { length: 50 }).default("medium"),
  complianceScore: integer("compliance_score").default(0),
  notes: text("notes"),
  tags: jsonb("tags").default([]),
}, (table) => ({
  organizationIdx: index("clients_organization_idx").on(table.organizationId),
  tinIdx: index("clients_tin_idx").on(table.tinNumber),
  emailIdx: index("clients_email_idx").on(table.email),
  statusIdx: index("clients_status_idx").on(table.status),
}))

// Document Management
export const documentTypes = pgTable("document_types", {
  ...baseFields,
  organizationId: uuid("organization_id").references(() => organizations.id),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
  requiredFor: jsonb("required_for").default([]), // Array of agency codes
  expiryPeriod: integer("expiry_period"), // Days
  isSystemType: boolean("is_system_type").default(false),
  validationRules: jsonb("validation_rules").default({}),
}, (table) => ({
  organizationIdx: index("document_types_organization_idx").on(table.organizationId),
  categoryIdx: index("document_types_category_idx").on(table.category),
}))

export const documents = pgTable("documents", {
  ...baseFields,
  clientId: uuid("client_id").notNull().references(() => clients.id),
  typeId: uuid("type_id").notNull().references(() => documentTypes.id),
  title: varchar("title", { length: 255 }).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  fileUrl: text("file_url").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  issueDate: timestamp("issue_date"),
  expiryDate: timestamp("expiry_date"),
  issuingAuthority: varchar("issuing_authority", { length: 255 }),
  version: integer("version").notNull().default(1),
  extractedText: text("extracted_text"),
  metadata: jsonb("metadata").default({}),
  tags: jsonb("tags").default([]),
}, (table) => ({
  clientIdx: index("documents_client_idx").on(table.clientId),
  typeIdx: index("documents_type_idx").on(table.typeId),
  statusIdx: index("documents_status_idx").on(table.status),
  expiryIdx: index("documents_expiry_idx").on(table.expiryDate),
}))

// Compliance and Regulatory
export const agencies = pgTable("agencies", {
  id: varchar("id", { length: 50 }).primaryKey(), // GRA, NIS, DCRA, etc.
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
  website: text("website"),
  contactInfo: jsonb("contact_info").default({}),
  priority: integer("priority").default(0),
  isActive: boolean("is_active").notNull().default(true),
}, (table) => ({
  categoryIdx: index("agencies_category_idx").on(table.category),
}))

export const filingTypes = pgTable("filing_types", {
  ...baseFields,
  organizationId: uuid("organization_id").references(() => organizations.id),
  agencyId: varchar("agency_id", { length: 50 }).notNull().references(() => agencies.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  frequency: varchar("frequency", { length: 50 }).notNull(), // monthly, quarterly, annually
  dueDay: integer("due_day"), // Day of month/quarter/year
  gracePeriod: integer("grace_period").default(0), // Days
  penaltyRate: decimal("penalty_rate", { precision: 5, scale: 4 }).default("0.0000"),
  formTemplate: jsonb("form_template").default({}),
  requiredDocuments: jsonb("required_documents").default([]),
  calculationRules: jsonb("calculation_rules").default({}),
}, (table) => ({
  organizationIdx: index("filing_types_organization_idx").on(table.organizationId),
  agencyIdx: index("filing_types_agency_idx").on(table.agencyId),
  frequencyIdx: index("filing_types_frequency_idx").on(table.frequency),
}))

export const filings = pgTable("filings", {
  ...baseFields,
  clientId: uuid("client_id").notNull().references(() => clients.id),
  filingTypeId: uuid("filing_type_id").notNull().references(() => filingTypes.id),
  period: varchar("period", { length: 50 }).notNull(), // 2024-01, 2024-Q1, 2024
  dueDate: timestamp("due_date").notNull(),
  submittedDate: timestamp("submitted_date"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  amount: decimal("amount", { precision: 15, scale: 2 }),
  penalty: decimal("penalty", { precision: 15, scale: 2 }).default("0.00"),
  formData: jsonb("form_data").default({}),
  attachedDocuments: jsonb("attached_documents").default([]),
  submissionReference: varchar("submission_reference", { length: 255 }),
  notes: text("notes"),
}, (table) => ({
  clientIdx: index("filings_client_idx").on(table.clientId),
  typeIdx: index("filings_type_idx").on(table.filingTypeId),
  statusIdx: index("filings_status_idx").on(table.status),
  dueIdx: index("filings_due_date_idx").on(table.dueDate),
  periodIdx: index("filings_period_idx").on(table.period),
}))

// Task and Workflow Management
export const tasks = pgTable("tasks", {
  ...baseFields,
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  clientId: uuid("client_id").references(() => clients.id),
  assignedTo: uuid("assigned_to").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: varchar("priority", { length: 50 }).notNull().default("medium"),
  status: varchar("status", { length: 50 }).notNull().default("todo"),
  category: varchar("category", { length: 100 }),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  estimatedHours: decimal("estimated_hours", { precision: 4, scale: 2 }),
  actualHours: decimal("actual_hours", { precision: 4, scale: 2 }),
  tags: jsonb("tags").default([]),
  metadata: jsonb("metadata").default({}),
}, (table) => ({
  organizationIdx: index("tasks_organization_idx").on(table.organizationId),
  clientIdx: index("tasks_client_idx").on(table.clientId),
  assignedIdx: index("tasks_assigned_idx").on(table.assignedTo),
  statusIdx: index("tasks_status_idx").on(table.status),
  dueIdx: index("tasks_due_date_idx").on(table.dueDate),
}))

// Audit and Activity Tracking
export const auditLogs = pgTable("audit_logs", {
  ...baseFields,
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  userId: uuid("user_id").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: varchar("resource_id", { length: 255 }),
  details: jsonb("details").default({}),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
}, (table) => ({
  organizationIdx: index("audit_logs_organization_idx").on(table.organizationId),
  userIdx: index("audit_logs_user_idx").on(table.userId),
  actionIdx: index("audit_logs_action_idx").on(table.action),
  resourceIdx: index("audit_logs_resource_idx").on(table.resource),
  createdIdx: index("audit_logs_created_idx").on(table.createdAt),
}))

// Analytics and Metrics
export const metrics = pgTable("metrics", {
  ...baseFields,
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  metric: varchar("metric", { length: 100 }).notNull(),
  value: decimal("value", { precision: 15, scale: 4 }).notNull(),
  dimensions: jsonb("dimensions").default({}),
  timestamp: timestamp("timestamp").notNull(),
}, (table) => ({
  organizationIdx: index("metrics_organization_idx").on(table.organizationId),
  metricIdx: index("metrics_metric_idx").on(table.metric),
  timestampIdx: index("metrics_timestamp_idx").on(table.timestamp),
  uniqueMetric: unique("metrics_unique").on(table.organizationId, table.metric, table.timestamp),
}))

// Notification System
export const notifications = pgTable("notifications", {
  ...baseFields,
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  userId: uuid("user_id").references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  data: jsonb("data").default({}),
  isRead: boolean("is_read").notNull().default(false),
  readAt: timestamp("read_at"),
  priority: varchar("priority", { length: 50 }).default("normal"),
}, (table) => ({
  organizationIdx: index("notifications_organization_idx").on(table.organizationId),
  userIdx: index("notifications_user_idx").on(table.userId),
  typeIdx: index("notifications_type_idx").on(table.type),
  isReadIdx: index("notifications_is_read_idx").on(table.isRead),
}))

// Export all table types for TypeScript inference
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Organization = typeof organizations.$inferSelect
export type NewOrganization = typeof organizations.$inferInsert

export type Client = typeof clients.$inferSelect
export type NewClient = typeof clients.$inferInsert

export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert

export type Filing = typeof filings.$inferSelect
export type NewFiling = typeof filings.$inferInsert

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert