import { PrismaClient, Role } from '../src/generated/prisma';

const prisma = new PrismaClient();

const TAX_TYPES = [
  {
    name: 'NAV szociális hozzájárulási adó',
    code: 'SZOCHO',
    order: 1,
    bankDetails: {
      accountNumber: '10032000-06056353',
      accountName: 'NAV Szociális hozzájárulási adó beszedési számla',
      bankName: 'Magyar Államkincstár',
    },
  },
  {
    name: 'NAV társadalombiztosítási járulék',
    code: 'TB',
    order: 2,
    bankDetails: {
      accountNumber: '10032000-06056229',
      accountName: 'NAV Egészségbiztosítási és munkaerő-piaci járulék beszedési számla',
      bankName: 'Magyar Államkincstár',
    },
  },
  {
    name: 'NAV személyi jövedelemadó',
    code: 'SZJA',
    order: 3,
    bankDetails: {
      accountNumber: '10032000-06056236',
      accountName: 'NAV Személyi jövedelemadó beszedési számla',
      bankName: 'Magyar Államkincstár',
    },
  },
  {
    name: 'NAV ÁFA',
    code: 'AFA',
    order: 4,
    bankDetails: {
      accountNumber: '10032000-01076349',
      accountName: 'NAV Általános forgalmi adó bevételi számla',
      bankName: 'Magyar Államkincstár',
    },
  },
];

async function main() {
  console.log('Starting database seeding...');

  await prisma.taxItem.deleteMany();
  await prisma.taxRecord.deleteMany();
  await prisma.userTaxPaymentDetail.deleteMany();
  await prisma.bankDetails.deleteMany();
  await prisma.taxType.deleteMany();
  await prisma.subscriptionLimits.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  for (const taxType of TAX_TYPES) {
    const { bankDetails, ...taxTypeData } = taxType;
    await prisma.taxType.create({
      data: {
        ...taxTypeData,
        bankDetails: {
          create: bankDetails,
        },
      },
    });
  }

  console.log('Seeded 4 tax types with bank details');

  const accountant = await prisma.user.create({
    data: {
      email: 'berenyi.lev+accountant@gmail.com',
      role: Role.ACCOUNTANT,
      firstName: 'Teszt',
      lastName: 'Könyvelő',
      name: 'Teszt Könyvelő',
      isActive: true,
      emailVerified: new Date(),
    },
  });

  console.log(`Seeded accountant: ${accountant.email}`);

  const client = await prisma.user.create({
    data: {
      email: 'berenyi.lev+client@gmail.com',
      role: Role.CLIENT,
      firstName: 'Teszt',
      lastName: 'Ügyfél',
      name: 'Teszt Ügyfél',
      isActive: true,
      emailVerified: new Date(),
      accountantId: accountant.id,
    },
  });

  console.log(`Seeded client: ${client.email} (linked to ${accountant.email})`);

  const subscription = await prisma.subscription.createMany({
    data: [
      {
        userId: client.id,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        stripeSubscriptionId: 'sub_1SzBzILKEwIG6ZEAGRzVQIuu',
        stripeCustomerId: 'cus_1SzBzILKEwIG6ZEAGRzVQIuu',
        stripePriceId: 'price_1SzBzILKEwIG6ZEAGRzVQIuu',
        planName: 'basic',
      },
      {
        userId: accountant.id,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        stripeSubscriptionId: 'sub_1SzBzILKEwIG6ZEAGRzVQIuu',
        stripeCustomerId: 'cus_1SzBzILKEwIG6ZEAGRzVQIuu',
        stripePriceId: 'price_1SzBzILKEwIG6ZEAGRzVQIuu',
        planName: 'basic',
      },
    ],
  });

  if (subscription.count === 2) {
    console.log('Seeded subscriptions');
  }

  console.log('Seeded subscriptions');

  console.log('Seeding complete!');
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
