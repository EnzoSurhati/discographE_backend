const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const NUM_USERS = 5;
const NUM_ALBUMS = 10;

async function main() {
    console.log('Seeding database...');

    // Seeding Users
    const users = [];
    for (let i = 0; i < NUM_USERS; i++) {
        const user = await prisma.user.create({
            data: {
                username: faker.internet.username(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            },
        });
        users.push(user);
    }
    console.log(`Seeded ${users.length} users.`);

    // Seeding Albums
    const albums = [];
    for (let i = 0; i < NUM_ALBUMS; i++) {
        const album = await prisma.album.create({
            data: {
                title: faker.music.songName(),
                posterUrl: faker.image.url(),
                description: faker.lorem.sentence(),
                userId: users[Math.floor(Math.random() * users.length)].id,
                quantity: faker.number.int({ min: 1, max: 20 }),
                price: faker.commerce.price({ min: 10, max: 40}),
            },
        });
        albums.push(album);
    }
    console.log(`Seeded ${albums.length} albums.`);
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