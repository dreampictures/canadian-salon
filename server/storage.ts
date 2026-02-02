import { db } from "./db";
import {
  users, certificates, galleryItems, contactMessages,
  type User, type Certificate, type GalleryItem, type ContactMessage,
  type InsertUser, 
  insertCertificateSchema, insertGalleryItemSchema, insertContactMessageSchema
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

// Define strict types for creation to avoid ambiguity
export type CreateCertificateRequest = z.infer<typeof insertCertificateSchema>;
export type CreateGalleryItemRequest = z.infer<typeof insertGalleryItemSchema>;
export type CreateContactMessageRequest = z.infer<typeof insertContactMessageSchema>;

export interface IStorage {
  // User (Admin)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Certificates
  getCertificates(): Promise<Certificate[]>;
  getCertificate(id: number): Promise<Certificate | undefined>;
  getCertificateByNumber(number: string): Promise<Certificate | undefined>;
  createCertificate(cert: CreateCertificateRequest & { verifyUrl: string, qrCodeUrl?: string }): Promise<Certificate>;
  deleteCertificate(id: number): Promise<void>;

  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  createGalleryItem(item: CreateGalleryItemRequest): Promise<GalleryItem>;
  deleteGalleryItem(id: number): Promise<void>;

  // Contact
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  // User
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Certificates
  async getCertificates(): Promise<Certificate[]> {
    return await db.select().from(certificates).orderBy(desc(certificates.createdAt));
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    const [cert] = await db.select().from(certificates).where(eq(certificates.id, id));
    return cert;
  }

  async getCertificateByNumber(number: string): Promise<Certificate | undefined> {
    const [cert] = await db.select().from(certificates).where(eq(certificates.certificateNumber, number));
    return cert;
  }

  async createCertificate(cert: CreateCertificateRequest & { verifyUrl: string, qrCodeUrl?: string }): Promise<Certificate> {
    const [newCert] = await db.insert(certificates).values(cert).returning();
    return newCert;
  }

  async deleteCertificate(id: number): Promise<void> {
    await db.delete(certificates).where(eq(certificates.id, id));
  }

  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt));
  }

  async createGalleryItem(item: CreateGalleryItemRequest): Promise<GalleryItem> {
    const [newItem] = await db.insert(galleryItems).values(item).returning();
    return newItem;
  }

  async deleteGalleryItem(id: number): Promise<void> {
    await db.delete(galleryItems).where(eq(galleryItems.id, id));
  }

  // Contact
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
