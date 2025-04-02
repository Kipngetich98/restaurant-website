const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.mpesaTransaction.deleteMany();
  await prisma.smsNotification.deleteMany();

  const menuItems = [
    {
      name: 'Classic Burger',
      description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
      price: 12.99,
      image: '/images/menu/classic-burger.jpg',
      category: 'Burgers',
      featured: true,
    },
    {
      name: 'Veggie Burger',
      description: 'Plant-based patty with avocado, sprouts, and vegan mayo',
      price: 14.99,
      image: '/images/menu/veggie-burger.jpg',
      category: 'Burgers',
      featured: false,
    },
    {
      name: 'Chicken Wings',
      description: 'Crispy wings tossed in your choice of sauce: BBQ, Buffalo, or Honey Garlic',
      price: 10.99,
      image: '/images/menu/chicken-wings.jpg',
      category: 'Appetizers',
      featured: true,
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
      price: 8.99,
      image: '/images/menu/caesar-salad.jpg',
      category: 'Salads',
      featured: false,
    },
    {
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomatoes, and basil on our homemade crust',
      price: 16.99,
      image: '/images/menu/margherita-pizza.jpg',
      category: 'Pizzas',
      featured: true,
    },
    {
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni and cheese on our homemade crust',
      price: 18.99,
      image: '/images/menu/pepperoni-pizza.jpg',
      category: 'Pizzas',
      featured: false,
    },
    {
      name: 'Chocolate Brownie',
      description: 'Warm chocolate brownie served with vanilla ice cream',
      price: 7.99,
      image: '/images/menu/chocolate-brownie.jpg',
      category: 'Desserts',
      featured: true,
    },
    {
      name: 'Cheesecake',
      description: 'New York style cheesecake with berry compote',
      price: 8.99,
      image: '/images/menu/cheesecake.jpg',
      category: 'Desserts',
      featured: false,
    },
    {
      name: 'Soda',
      description: 'Your choice of Coke, Sprite, or Fanta',
      price: 2.99,
      image: '/images/menu/soda.jpg',
      category: 'Drinks',
      featured: false,
    },
    {
      name: 'Fresh Juice',
      description: 'Freshly squeezed orange, apple, or pineapple juice',
      price: 4.99,
      image: '/images/menu/fresh-juice.jpg',
      category: 'Drinks',
      featured: true,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
