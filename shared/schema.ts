import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users (Simple auth)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Certificates
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  certificateNumber: text("certificate_number").notNull().unique(),
  courseName: text("course_name").notNull(),
  courseDuration: text("course_duration").notNull(),
  attendancePercentage: integer("attendance_percentage").notNull(),
  grade: text("grade").notNull(),
  issueDate: text("issue_date").notNull(), // ISO date string
  studentPhoto: text("student_photo"), // URL
  qrCodeUrl: text("qr_code_url"), // Generated URL or Base64
  verifyUrl: text("verify_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gallery/Our Work
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // e.g., 'Hair', 'Nails', 'Makeup'
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users);
export const insertCertificateSchema = createInsertSchema(certificates).omit({ 
  id: true, 
  createdAt: true,
  qrCodeUrl: true, 
  verifyUrl: true 
});
export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({ id: true, createdAt: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type Certificate = typeof certificates.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
