import {
  FieldVariant,
  FormStatus,
  PrismaClient,
} from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.appointmentReminder.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.service.deleteMany();
  await prisma.formField.deleteMany();
  await prisma.form.deleteMany();
  await prisma.websiteIntegration.deleteMany();
  await prisma.timeOff.deleteMany();
  await prisma.breakTime.deleteMany();
  await prisma.businessHours.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.calendarIntegration.deleteMany();
  await prisma.subscriptionLimits.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.business.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'berenyi.lev@gmail.com',
        firstName: 'Lev',
        lastName: 'Berenyi',
        name: 'Lev Berenyi',
        phone: '+1-555-0123',
        isActive: true,
        emailVerified: new Date(),
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        name: 'Jane Smith',
        phone: '+1-555-0124',
        isActive: true,
        emailVerified: new Date(),
        image:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.wilson@example.com',
        firstName: 'Mike',
        lastName: 'Wilson',
        name: 'Mike Wilson',
        phone: '+1-555-0125',
        isActive: true,
        emailVerified: new Date(),
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah.johnson@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        name: 'Sarah Johnson',
        phone: '+1-555-0126',
        isActive: true,
        emailVerified: new Date(),
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
    }),
  ]);

  console.log('👥 Created users');

  // Create subscriptions
  const subscriptions = await Promise.all([
    prisma.subscription.create({
      data: {
        userId: users[0].id,
        planName: 'business_pro',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        cancelAtPeriodEnd: false,
        stripeSubscriptionId: 'sub_sample_1',
        stripeCustomerId: 'cus_sample_1',
        stripePriceId: 'price_sample_1',
        limits: {
          create: {
            maxBusinesses: 5,
            maxForms: 20,
            maxTeamMembers: 10,
            maxAppointmentsPerMonth: 1000,
          },
        },
      },
    }),
    prisma.subscription.create({
      data: {
        userId: users[1].id,
        planName: 'starter',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancelAtPeriodEnd: false,
        stripeSubscriptionId: 'sub_sample_2',
        stripeCustomerId: 'cus_sample_2',
        stripePriceId: 'price_sample_2',
        limits: {
          create: {
            maxBusinesses: 1,
            maxForms: 5,
            maxTeamMembers: 3,
            maxAppointmentsPerMonth: 100,
          },
        },
      },
    }),
  ]);

  console.log('💳 Created subscriptions');

  // Create businesses
  const businesses = await Promise.all([
    prisma.business.create({
      data: {
        ownerId: users[0].id,
        name: 'Downtown Dental Clinic',
        description:
          'Professional dental care services in the heart of downtown',
        businessType: 'healthcare',
        logoUrl:
          'https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=200&h=200&fit=crop',
        primaryColor: '#3B82F6',
        isActive: true,
      },
    }),
    prisma.business.create({
      data: {
        ownerId: users[1].id,
        name: 'Beauty & Style Salon',
        description:
          'Full-service beauty salon offering hair, makeup, and spa services',
        businessType: 'beauty',
        logoUrl:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
        primaryColor: '#EC4899',
        isActive: true,
      },
    }),
    prisma.business.create({
      data: {
        ownerId: users[2].id,
        name: 'Tech Consulting Solutions',
        description: 'IT consulting and software development services',
        businessType: 'consulting',
        logoUrl:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
        primaryColor: '#10B981',
        isActive: true,
      },
    }),
  ]);

  console.log('🏢 Created businesses');

  // Create team members
  const teamMembers = await Promise.all([
    prisma.teamMember.create({
      data: {
        businessId: businesses[0].id,
        userId: users[1].id,
        role: 'manager',
        isActive: true,
      },
    }),
    prisma.teamMember.create({
      data: {
        businessId: businesses[0].id,
        userId: users[2].id,
        role: 'staff',
        isActive: true,
      },
    }),
    prisma.teamMember.create({
      data: {
        businessId: businesses[1].id,
        userId: users[3].id,
        role: 'staff',
        isActive: true,
      },
    }),
  ]);

  console.log('👥 Created team members');

  // Create business hours
  await Promise.all([
    prisma.businessHours.create({
      data: {
        businessId: businesses[0].id,
        dayOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        openTime: '09:00',
        closeTime: '17:00',
      },
    }),
    prisma.businessHours.create({
      data: {
        businessId: businesses[1].id,
        dayOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        openTime: '10:00',
        closeTime: '19:00',
      },
    }),
  ]);

  console.log('🕐 Created business hours');

  // Create break times
  await Promise.all([
    prisma.breakTime.create({
      data: {
        businessId: businesses[0].id,
        dayOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        startTime: '12:00',
        endTime: '13:00',
      },
    }),
    prisma.breakTime.create({
      data: {
        businessId: businesses[1].id,
        dayOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        startTime: '13:00',
        endTime: '14:00',
      },
    }),
  ]);

  console.log('☕ Created break times');

  // Create forms
  const forms = await Promise.all([
    prisma.form.create({
      data: {
        businessId: businesses[0].id,
        name: 'Dental Appointment Form',
        description: 'Standard form for dental appointments',
        isTemplate: false,
        confirmationMessage:
          'Thank you for booking your dental appointment! We will send you a confirmation email shortly.',
        url: 'https://downtowndental.com/thank-you',
        allowCancellation: true,
        cancellationNoticeHours: 24,
        status: FormStatus.LIVE,
      },
    }),
    prisma.form.create({
      data: {
        businessId: businesses[1].id,
        name: 'Hair Styling Consultation',
        description: 'Form for hair styling consultations',
        isTemplate: false,
        confirmationMessage:
          'Your hair consultation has been booked! See you soon.',
        url: 'https://beautysalon.com/confirmation',
        allowCancellation: true,
        cancellationNoticeHours: 12,
        status: FormStatus.LIVE,
      },
    }),
  ]);

  console.log('📝 Created forms');

  // Create form fields
  const formFields = await Promise.all([
    // Dental form fields
    prisma.formField.create({
      data: {
        formId: forms[0].id,
        fieldVariant: FieldVariant.TEXT_INPUT,
        label: 'Full Name',
        placeholder: 'Enter your full name',
        isRequired: true,
        fieldOrder: 1,
      },
    }),
    prisma.formField.create({
      data: {
        formId: forms[0].id,
        fieldVariant: FieldVariant.EMAIL_INPUT,
        label: 'Email Address',
        placeholder: 'Enter your email address',
        isRequired: true,
        fieldOrder: 2,
      },
    }),
    prisma.formField.create({
      data: {
        formId: forms[0].id,
        fieldVariant: FieldVariant.PHONE_INPUT,
        label: 'Phone Number',
        placeholder: 'Enter your phone number',
        isRequired: true,
        fieldOrder: 3,
      },
    }),
    prisma.formField.create({
      data: {
        formId: forms[0].id,
        fieldVariant: FieldVariant.SELECT,
        label: 'Appointment Type',
        placeholder: 'Select appointment type',
        isRequired: true,
        fieldOrder: 4,
        options: [
          'Check-up',
          'Cleaning',
          'Filling',
          'Root Canal',
          'Consultation',
        ],
      },
    }),
    prisma.formField.create({
      data: {
        formId: forms[0].id,
        fieldVariant: FieldVariant.TEXTAREA,
        label: 'Additional Notes',
        placeholder: 'Any special requests or concerns?',
        isRequired: false,
        fieldOrder: 5,
      },
    }),
    // Hair salon form fields
    prisma.formField.create({
      data: {
        formId: forms[1].id,
        fieldVariant: FieldVariant.TEXT_INPUT,
        label: 'Full Name',
        placeholder: 'Enter your full name',
        isRequired: true,
        fieldOrder: 1,
      },
    }),
    prisma.formField.create({
      data: {
        formId: forms[1].id,
        fieldVariant: FieldVariant.EMAIL_INPUT,
        label: 'Email Address',
        placeholder: 'Enter your email address',
        isRequired: true,
        fieldOrder: 2,
      },
    }),
    prisma.formField.create({
      data: {
        formId: forms[1].id,
        fieldVariant: FieldVariant.SELECT,
        label: 'Service Type',
        placeholder: 'Select service type',
        isRequired: true,
        fieldOrder: 3,
        options: [
          'Haircut',
          'Hair Coloring',
          'Styling',
          'Treatment',
          'Consultation',
        ],
      },
    }),
    prisma.formField.create({
      data: {
        formId: forms[1].id,
        fieldVariant: FieldVariant.TEXTAREA,
        label: 'Hair Description',
        placeholder:
          "Describe your current hair style, length, and what you'd like to achieve",
        isRequired: false,
        fieldOrder: 4,
      },
    }),
  ]);

  console.log('📋 Created form fields');

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        businessId: businesses[0].id,
        name: 'Dental Check-up',
        description: 'Comprehensive dental examination and cleaning',
        duration: '60',
        bufferTime: '15',
        price: '150.00',
        currency: 'USD',
        color: '#3B82F6',
        formId: forms[0].id,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        businessId: businesses[0].id,
        name: 'Teeth Cleaning',
        description: 'Professional teeth cleaning and polishing',
        duration: '45',
        bufferTime: '10',
        price: '120.00',
        currency: 'USD',
        color: '#10B981',
        formId: forms[0].id,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        businessId: businesses[0].id,
        name: 'Cavity Filling',
        description: 'Dental filling for cavities',
        duration: '90',
        bufferTime: '20',
        price: '200.00',
        currency: 'USD',
        color: '#F59E0B',
        formId: forms[0].id,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        businessId: businesses[1].id,
        name: 'Haircut & Styling',
        description: 'Professional haircut and styling service',
        duration: '60',
        bufferTime: '15',
        price: '75.00',
        currency: 'USD',
        color: '#EC4899',
        formId: forms[1].id,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        businessId: businesses[1].id,
        name: 'Hair Coloring',
        description: 'Full hair coloring service',
        duration: '120',
        bufferTime: '30',
        price: '150.00',
        currency: 'USD',
        color: '#8B5CF6',
        formId: forms[1].id,
        isActive: true,
      },
    }),
  ]);

  console.log('🛠️  Created services');

  // Create appointments
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        businessId: businesses[0].id,
        serviceId: services[0].id,
        teamMemberId: teamMembers[0].id,
        customerName: 'Alice Johnson',
        customerEmail: 'alice.johnson@example.com',
        customerPhone: '+1-555-0101',
        title: 'Dental Check-up',
        description: 'Patient prefers morning appointments',
        start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour later
        status: 'confirmed',
        notes: 'Patient prefers morning appointments',
        formData: {
          fullName: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          phone: '+1-555-0101',
          appointmentType: 'Check-up',
          additionalNotes: 'Patient prefers morning appointments',
        },
      },
    }),
    prisma.appointment.create({
      data: {
        businessId: businesses[0].id,
        serviceId: services[1].id,
        teamMemberId: teamMembers[1].id,
        customerName: 'Bob Smith',
        customerEmail: 'bob.smith@example.com',
        customerPhone: '+1-555-0102',
        title: 'Teeth Cleaning',
        description: 'Regular cleaning appointment',
        start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000), // 45 minutes later
        status: 'confirmed',
        notes: 'Regular cleaning appointment',
        formData: {
          fullName: 'Bob Smith',
          email: 'bob.smith@example.com',
          phone: '+1-555-0102',
          appointmentType: 'Cleaning',
          additionalNotes: 'Regular cleaning appointment',
        },
      },
    }),
    prisma.appointment.create({
      data: {
        businessId: businesses[1].id,
        serviceId: services[3].id,
        teamMemberId: teamMembers[2].id,
        customerName: 'Carol Davis',
        customerEmail: 'carol.davis@example.com',
        customerPhone: '+1-555-0103',
        title: 'Haircut & Styling',
        description: 'First time client',
        start: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour later
        status: 'confirmed',
        notes: 'First time client',
        formData: {
          fullName: 'Carol Davis',
          email: 'carol.davis@example.com',
          serviceType: 'Haircut',
          hairDescription: 'Medium length, looking for a modern bob cut',
        },
      },
    }),
  ]);

  console.log('📅 Created appointments');

  // Create appointment reminders
  const appointmentReminders = await Promise.all([
    prisma.appointmentReminder.create({
      data: {
        appointmentId: appointments[0].id,
        reminderType: 'email',
        scheduledTime: new Date(
          appointments[0].start.getTime() - 24 * 60 * 60 * 1000
        ), // 24 hours before
        status: 'pending',
      },
    }),
    prisma.appointmentReminder.create({
      data: {
        appointmentId: appointments[0].id,
        reminderType: 'sms',
        scheduledTime: new Date(
          appointments[0].start.getTime() - 2 * 60 * 60 * 1000
        ), // 2 hours before
        status: 'pending',
      },
    }),
    prisma.appointmentReminder.create({
      data: {
        appointmentId: appointments[1].id,
        reminderType: 'email',
        scheduledTime: new Date(
          appointments[1].start.getTime() - 24 * 60 * 60 * 1000
        ),
        status: 'pending',
      },
    }),
  ]);

  console.log('🔔 Created appointment reminders');

  // Create time off entries
  const timeOffs = await Promise.all([
    prisma.timeOff.create({
      data: {
        businessId: businesses[0].id,
        teamMemberId: teamMembers[0].id,
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        startTime: new Date('2024-01-01T12:00:00Z'),
        endTime: new Date('2024-01-01T13:00:00Z'),
        description: 'Lunch break',
      },
    }),
    prisma.timeOff.create({
      data: {
        businessId: businesses[0].id,
        startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        endDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000), // 2 weeks + 2 days
        description: 'Office closed for holidays',
      },
    }),
  ]);

  console.log('🏖️  Created time off entries');

  // Create website integrations
  const websiteIntegrations = await Promise.all([
    prisma.websiteIntegration.create({
      data: {
        businessId: businesses[0].id,
        formId: forms[0].id,
        integrationType: 'embed',
        embedCode:
          '<script src="https://timegrid.app/embed/dental-form.js"></script>',
        settings: {
          theme: 'light',
          primaryColor: '#3B82F6',
          showBusinessInfo: true,
        },
      },
    }),
    prisma.websiteIntegration.create({
      data: {
        businessId: businesses[1].id,
        formId: forms[1].id,
        integrationType: 'wordpress',
        embedCode: '[timegrid_form id="hair-consultation"]',
        settings: {
          theme: 'dark',
          primaryColor: '#EC4899',
          showBusinessInfo: true,
        },
      },
    }),
  ]);

  console.log('🌐 Created website integrations');

  // Create calendar integrations
  const calendarIntegrations = await Promise.all([
    prisma.calendarIntegration.create({
      data: {
        userId: users[0].id,
        provider: 'google',
        accessToken: 'sample_access_token_1',
        refreshToken: 'sample_refresh_token_1',
        tokenExpiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour from now
        calendarId: 'primary',
        isActive: true,
      },
    }),
    prisma.calendarIntegration.create({
      data: {
        userId: users[1].id,
        provider: 'outlook',
        accessToken: 'sample_access_token_2',
        refreshToken: 'sample_refresh_token_2',
        tokenExpiresAt: new Date(Date.now() + 3600 * 1000),
        calendarId: 'default',
        isActive: true,
      },
    }),
  ]);

  console.log('📅 Created calendar integrations');

  // Create verification tokens
  const verificationTokens = await Promise.all([
    prisma.verificationToken.create({
      data: {
        identifier: 'john.doe@example.com',
        token: 'sample_verification_token_1',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      },
    }),
    prisma.verificationToken.create({
      data: {
        identifier: 'jane.smith@example.com',
        token: 'sample_verification_token_2',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log('🔐 Created verification tokens');

  console.log('✅ Database seeding completed successfully!');
  console.log(`📊 Created ${users.length} users`);
  console.log(`🏢 Created ${businesses.length} businesses`);
  console.log(`👥 Created ${teamMembers.length} team members`);
  console.log(`📝 Created ${forms.length} forms`);
  console.log(`🛠️  Created ${services.length} services`);
  console.log(`📅 Created ${appointments.length} appointments`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
