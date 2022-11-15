import { Client } from "ts-postgres";
import { createClient } from "./postgresql";

const booksCount = 100000;
const BATCH_SIZE = 1000;

export async function run() {
    console.log('Test started...');
    await insert(createClient('db_normal'));
    await insert(createClient('db_primary'));
    console.log('Test finished');
}

export async function insert(client: Client) {
    await client.connect();
    var startTime = performance.now()
    await insertBooks(client);
    const result = client.query(
        "SELECT COUNT(*) from books"
    );
    var endTime = performance.now();
    const delta = ~~(endTime - startTime);
    console.log(`Insertion of ${booksCount} for ${client.config.host}, BATCH_SIZE ${BATCH_SIZE} took ${delta} ms`)
    for await (const row of result) {
        console.log("row", row);
    }
}

async function insertBooks(client: Client) {
    let id = 0;
    let values: string[] = [];
    while (id < booksCount) {
        id++;
        const categoryId = getRandom(10);
        values.push(`(${id},${categoryId}, 'Lina Kostenko', 'Marusya Churay', '1978')`)
        if (values.length > BATCH_SIZE || id === booksCount) {
            await insertBook(values, client);
            values = [];
        }
    }
}

async function insertBook(values: string[], client: Client) {
    await client.query(
        `INSERT INTO books (id, category_id, author, title, year)
         VALUES ${values.join(', ')};`
    );
}

function getRandom(max: number) {
    return Math.floor(Math.random() * max);
}

run();