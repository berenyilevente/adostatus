# TimeGrid Web Application – Project Plan

## 🗂️ 1. Project Phases

1. Database & Backend
2. UI Development
3. Feature Development
4. Admin Dashboard
5. Notifications & Integrations
6. Testing
7. Deployment
9. Post-MVP / Stretch Goals

## 📋 2. Tasks & Deliverables

### Phase: Database & Backend
- Task: Define Prisma schema
  Description: Create models for `User`, `Form`, and `Appointment`.
  Dependencies: App design doc
  Priority: High

- Task: Create DB migration & seed
  Description: Run migration and insert sample users, forms, and appointments.
  Dependencies: Prisma schema
  Priority: High

- Task: Implement role-based auth middleware
  Description: Restrict routes and server actions by user role.
  Dependencies: NextAuth setup
  Priority: Medium

- Task: Configure NextAuth with magic links
  Description: Enable login/signup using email magic links and API keys.
  Dependencies: Prisma schema, DB
  Priority: High

### Phase: UI Development
- Task: Layout & navigation shell
  Description: Implement responsive layout (sidebar, top bar, main area).
  Dependencies: Tailwind, Shadcn
  Priority: High

- Task: Build form builder UI
  Description: UI for creating/editing dynamic forms (fields, logo upload, rules).
  Dependencies: Form model
  Priority: High

- Task: Scheduling form frontend
  Description: Public booking page for customers at `/schedule/[form_id]`.
  Dependencies: Form + appointment backend
  Priority: High

- Task: Embed modal generator
  Description: UI to generate HTML embed code for external websites.
  Dependencies: Form data
  Priority: Medium

### Phase: Feature Development
- Task: Appointment booking API
  Description: Server action to submit and validate a booking.
  Dependencies: Prisma, form logic
  Priority: High

- Task: Calendar view per form
  Description: Interactive calendar for Admins/Users to view appointments.
  Dependencies: Appointment data
  Priority: High

- Task: Assign users to forms
  Description: Allow Admin to invite/manage Basic Users with scoped calendar access.
  Dependencies: User model
  Priority: Medium

- Task: Role-based dashboard views
  Description: Admins can manage everything; Basic Users only see allowed forms.
  Dependencies: Auth middleware
  Priority: Medium

### Phase: Admin Dashboard
- Task: Form management interface
  Description: Create, edit, and delete appointment forms.
  Dependencies: Form builder
  Priority: High

- Task: User management screen
  Description: Invite and manage users with role and calendar scope control.
  Dependencies: User model
  Priority: Medium

- Task: Form calendar selector
  Description: Dropdown to select calendar (form) to view associated bookings.
  Dependencies: Appointment data
  Priority: Medium

### Phase: Notifications & Integrations
- Task: Setup Resend for emails
  Description: Configure Resend for transactional email delivery.
  Dependencies: Booking logic
  Priority: High

- Task: Send email on new booking
  Description: Notify admin and customer when booking is created.
  Dependencies: Resend config
  Priority: High

- Task: Stripe setup for subscription
  Description: Integrate Stripe for SaaS subscription payments.
  Dependencies: Payment flow
  Priority: Medium

### Phase: Testing
- Task: Manual testing of booking flow
  Description: Test public booking and email flow end-to-end.
  Dependencies: Booking form
  Priority: High

- Task: Form builder test cases
  Description: Ensure different input types work correctly.
  Dependencies: Form builder
  Priority: Medium

### Phase: Deployment
- Task: Deploy to Vercel
  Description: Connect project to Vercel and configure environment variables.
  Dependencies: All core features
  Priority: High

- Task: Enable PostgreSQL (e.g., Railway or Supabase)
  Description: Provision production DB and update connection string.
  Dependencies: Prisma
  Priority: High

### Phase: Post-MVP / Stretch Goals
- Task: Native WordPress plugin
  Description: Build a plugin to easily embed scheduling forms.
  Dependencies: Embed system
  Priority: Low

- Task: Webflow component integration
  Description: Provide no-code embeddable code block for Webflow users.
  Dependencies: Embed generator
  Priority: Low

- Task: Multi-tenant usage metrics
  Description: Add analytics for form usage/bookings by business.
  Dependencies: Post-MVP adoption
  Priority: Low

## ⚙️ 3. Environment & DevOps Notes

### Environment Variables:
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- RESEND_API_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

### Database:
- Use Railway or Supabase
- Seed dev data with dummy users/forms/bookings

### CI/CD:
- Use Vercel’s GitHub integration for preview deployments
- Protect main branch via PR reviews

## 🧠 4. Tips & Considerations

### Performance:
- Use pagination on calendar and booking views
- Load form JSON only when editing/viewing

### Developer Productivity:
- Use Shadcn UI for fast UI dev
- Co-locate server actions with components

### Code Structure:
- Organize with `app/(auth)`, `app/(dashboard)`, `app/(public)`
- Validate models using Zod

### Reuse:
- Create <FormBuilder /> and <DynamicFormRenderer />
- Make <CalendarView /> reusable by form ID