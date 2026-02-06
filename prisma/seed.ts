import { FormStatus, PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.appointment.deleteMany();
  await prisma.service.deleteMany();
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
