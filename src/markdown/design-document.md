# 🧩 TimeGrid – Technical Design Document

## 💡 1. App Overview

**Name:** TimeGrid

**Description:**  
TimeGrid is a flexible appointment scheduling platform designed to support a wide range of businesses — from restaurants and salons to dentists and consultants. Its key differentiator is the customizable scheduling form builder that allows admins to create industry-specific booking templates.

**Target Audience:**  
Any business that relies on appointment bookings — including restaurants, clinics, salons, and more — as well as multi-business owners needing a unified solution.

**Problems Solved:**
- Eliminates the need for multiple scheduling tools across different business types
- Offers granular form and calendar customization for niche needs
- Simplifies integration into existing websites (e.g., WordPress, Webflow)

---

## 🧱 2. Core Features

**Main Features:**
- Admin dashboard with a calendar view of bookings
- Form builder for creating appointment scheduling forms
- Pre-built form templates for use cases like doctors, restaurants, salons, etc.
- User management system (Admins can invite Basic Users)
- Exportable schedule buttons (integrates into external websites)
- Custom scheduling page (/schedule/[form_id]) for end users to book appointments

**Nice-to-Have:**
- Streamlined integration modules for WordPress and Webflow

**User Roles:**
- **Admin:** Can create/edit forms, manage users, view all calendars, export widgets
- **Basic User:** Can log in and view only assigned calendars (read-only)

---

## 👤 3. User Journey

**Admin Flow:**
1. Purchase subscription → receive API key
2. Sign up with magic link using API key
3. Access dashboard: create/edit scheduling forms
4. Export appointment button → embed in business site
5. Manage incoming bookings via calendar

**Customer Flow (External Users):**
1. Visit business website → click "Book Now" button
2. Redirected to TimeGrid (/schedule/form_id)
3. Fill and submit appointment form

---

## 📊 4. Data Model & Entities

**1. User**
- id (UUID)
- email
- name
- role (enum: ADMIN | BASIC)
- apiKey
- assignedFormIds (optional – for BASIC users)

**2. Form**
- id (UUID)
- title
- description
- fields (JSON – for dynamic form inputs)
- logoUrl
- businessName
- availability (e.g., days/hours open)
- createdBy (User FK)

**3. Appointment**
- id (UUID)
- formId (FK)
- formResponses (JSON)
- scheduledAt (DateTime)
- customerEmail
- customerName
- status (e.g., confirmed, cancelled)

**Relationships:**
- One Admin → Many Forms
- One Form → Many Appointments
- One Appointment → One Form
- One Form → Many Viewers (Basic Users, restricted by permission)

---

## 🔐 5. Authentication & Authorization
- **Auth Method:** NextAuth with Magic Links
- **Signup Flow:** Requires valid API key
- **Roles:**
  - **Admin:** Full CRUD access
  - **Basic User:** Read-only calendar access (per form permissions)

---

## 🖼️ 6. UI/UX & Design
- **Tech Stack:** React + Next.js (App Router), Tailwind CSS, Shadcn UI, Lucide Icons
- **Design Source:** Pre-built template (mobile and tablet responsive)
- **Key Components Needed:**
  - Dashboard
  - Calendar view
  - Form builder (drag/drop or structured form editor)
  - Modals (e.g., for adding forms/users)
  - Tables (for managing users/appointments)
  - Export widget modal

---

## 🔔 7. Notifications, Emails, Integrations
- **Emails via Resend:**
  - On new booking (to admin)
  - On booking changes (to admin and customer)
- **Integrations:**
  - Stripe: For subscription payments
  - Website Platforms: Embed buttons on WordPress, Webflow, plain HTML
  - Background Jobs: None required

---

## 📈 8. Scalability & Performance
- **Initial Usage:** Low user volume at launch
- **Performance-Sensitive Areas:** None at this stage

---

## 🚀 9. Admin or Backoffice Features
- **Admin Dashboard:** Yes
- **Controls:** Admins can manage:
  - Form creation & editing
  - Appointments overview (per form)
  - User access (restrict to specific calendars)

---

## 🧪 10. Testing & Deployment
- **Tests Required:** None initially
- **Deployment Platform:** Vercel

---

## ✨ 11. Additional Notes
- Future pricing plans may link number of forms to tier
- Designed to be flexible enough to support multiple business types within a single organization

---
