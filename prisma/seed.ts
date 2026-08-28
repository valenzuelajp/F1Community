// F1Store Database Seed
// Run with: pnpm db:seed

import { PrismaClient, Role, OrderStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data (in order of dependencies)
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.address.deleteMany();
  await prisma.collectionProduct.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.team.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data');

  // Create Teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: 'Mercedes-AMG Petronas F1 Team',
        slug: 'mercedes',
        shortName: 'MER',
        primaryColor: '#00D2BE',
        secondaryColor: '#000000',
        isActive: true,
      },
    }),
    prisma.team.create({
      data: {
        name: 'Scuderia Ferrari',
        slug: 'ferrari',
        shortName: 'FER',
        primaryColor: '#DC143C',
        secondaryColor: '#FFD700',
        isActive: true,
      },
    }),
    prisma.team.create({
      data: {
        name: 'Oracle Red Bull Racing',
        slug: 'red-bull',
        shortName: 'RBR',
        primaryColor: '#1E41FF',
        secondaryColor: '#FFD700',
        isActive: true,
      },
    }),
    prisma.team.create({
      data: {
        name: 'McLaren Formula 1 Team',
        slug: 'mclaren',
        shortName: 'MCL',
        primaryColor: '#FF8700',
        secondaryColor: '#000000',
        isActive: true,
      },
    }),
    prisma.team.create({
      data: {
        name: 'Aston Martin Aramco F1 Team',
        slug: 'aston-martin',
        shortName: 'AM',
        primaryColor: '#006F62',
        secondaryColor: '#FFFFFF',
        isActive: true,
      },
    }),
  ]);

  console.log('🏎️ Created teams:', teams.map(t => t.name).join(', '));

  // Create Drivers
  const drivers = await Promise.all([
    prisma.driver.create({
      data: {
        name: 'Max Verstappen',
        slug: 'max-verstappen',
        number: 1,
        code: 'VER',
        teamId: teams[2].id, // Red Bull
        isActive: true,
      },
    }),
    prisma.driver.create({
      data: {
        name: 'Lewis Hamilton',
        slug: 'lewis-hamilton',
        number: 44,
        code: 'HAM',
        teamId: teams[0].id, // Mercedes
        isActive: true,
      },
    }),
    prisma.driver.create({
      data: {
        name: 'Charles Leclerc',
        slug: 'charles-leclerc',
        number: 16,
        code: 'LEC',
        teamId: teams[1].id, // Ferrari
        isActive: true,
      },
    }),
    prisma.driver.create({
      data: {
        name: 'Lando Norris',
        slug: 'lando-norris',
        number: 4,
        code: 'NOR',
        teamId: teams[3].id, // McLaren
        isActive: true,
      },
    }),
    prisma.driver.create({
      data: {
        name: 'Fernando Alonso',
        slug: 'fernando-alonso',
        number: 14,
        code: 'ALO',
        teamId: teams[4].id, // Aston Martin
        isActive: true,
      },
    }),
  ]);

  console.log('👨‍🏎️ Created drivers:', drivers.map(d => d.name).join(', '));

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Apparel',
        slug: 'apparel',
        description: 'Official team and driver clothing',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Headwear',
        slug: 'headwear',
        description: 'Caps, hats, and beanies',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Bags, keychains, and collectibles',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Collectibles',
        slug: 'collectibles',
        description: 'Die-cast models, signed memorabilia',
      },
    }),
  ]);

  console.log('📦 Created categories:', categories.map(c => c.name).join(', '));

  // Create Products with Variants
  const products = [];

  for (const team of teams) {
    // Team Polo
    const polo = await prisma.product.create({
      data: {
        name: `${team.name} 2024 Team Polo`,
        slug: `${team.slug}-2024-team-polo`,
        description: `Official ${team.name} 2024 season team polo. Worn by team personnel throughout the race weekend.`,
        basePrice: 89.99,
        categoryId: categories[0].id, // Apparel
        teamId: team.id,
        isActive: true,
        isFeatured: true,
        variants: {
          create: [
            { sku: `${team.shortName}-POLO-S`, name: 'Small', size: 'S', price: 89.99, inventory: 50 },
            { sku: `${team.shortName}-POLO-M`, name: 'Medium', size: 'M', price: 89.99, inventory: 75 },
            { sku: `${team.shortName}-POLO-L`, name: 'Large', size: 'L', price: 89.99, inventory: 75 },
            { sku: `${team.shortName}-POLO-XL`, name: 'X-Large', size: 'XL', price: 89.99, inventory: 50 },
            { sku: `${team.shortName}-POLO-XXL`, name: 'XX-Large', size: 'XXL', price: 94.99, inventory: 25 },
          ],
        },
      },
    });
    products.push(polo);

    // Team Cap
    const cap = await prisma.product.create({
      data: {
        name: `${team.name} 2024 Team Cap`,
        slug: `${team.slug}-2024-team-cap`,
        description: `Official ${team.name} 2024 team cap. Adjustable fit with team branding.`,
        basePrice: 34.99,
        categoryId: categories[1].id, // Headwear
        teamId: team.id,
        isActive: true,
        isFeatured: true,
        variants: {
          create: [
            { sku: `${team.shortName}-CAP-OS`, name: 'One Size', size: 'OS', price: 34.99, inventory: 100 },
          ],
        },
      },
    });
    products.push(cap);
  }

  // Driver-specific products
  for (const driver of drivers) {
    const tee = await prisma.product.create({
      data: {
        name: `${driver.name} 2024 Driver T-Shirt`,
        slug: `${driver.slug}-2024-driver-tee`,
        description: `Official ${driver.name} (#${driver.number}) 2024 driver t-shirt.`,
        basePrice: 49.99,
        categoryId: categories[0].id,
        teamId: driver.teamId,
        driverId: driver.id,
        isActive: true,
        variants: {
          create: [
            { sku: `${driver.code}-TEE-S`, name: 'Small', size: 'S', price: 49.99, inventory: 30 },
            { sku: `${driver.code}-TEE-M`, name: 'Medium', size: 'M', price: 49.99, inventory: 50 },
            { sku: `${driver.code}-TEE-L`, name: 'Large', size: 'L', price: 49.99, inventory: 50 },
            { sku: `${driver.code}-TEE-XL`, name: 'X-Large', size: 'XL', price: 49.99, inventory: 30 },
          ],
        },
      },
    });
    products.push(tee);
  }

  // Accessories
  const keychain = await prisma.product.create({
    data: {
      name: 'F1 Official Metal Keychain',
      slug: 'f1-official-metal-keychain',
      description: 'Premium metal keychain with Formula 1 logo.',
      basePrice: 12.99,
      categoryId: categories[2].id, // Accessories
      isActive: true,
      variants: {
        create: [
          { sku: 'F1-KEYCHAIN', name: 'Standard', price: 12.99, inventory: 200 },
        ],
      },
    },
  });
  products.push(keychain);

  console.log('🛍️ Created products:', products.length);

  // Create a Collection
  const collection = await prisma.collection.create({
    data: {
      name: '2024 Season Launch',
      slug: '2024-season-launch',
      description: 'Official 2024 season team and driver merchandise.',
      isActive: true,
      products: {
        create: products.slice(0, 10).map((p, i) => ({
          productId: p.id,
          position: i + 1,
        })),
      },
    },
  });

  console.log('📋 Created collection:', collection.name);

  // Create Admin User
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@f1store.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });

  console.log('👤 Created admin user:', admin.email);

  // Create Test Customer
  const customerPassword = await hash('customer123', 12);
  const customer = await prisma.user.create({
    data: {
      email: 'customer@f1store.com',
      name: 'Test Customer',
      passwordHash: customerPassword,
      role: Role.CUSTOMER,
      emailVerified: new Date(),
    },
  });

  console.log('👤 Created test customer:', customer.email);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });