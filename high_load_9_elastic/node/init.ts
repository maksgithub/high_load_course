import {
  CreateIndexIfNotExists,
  deleteIndex,
  getDataSet,
  getIndices,
  insertDocuments,
  search,
} from "./requestHelper";

const indexName = "words";
async function run() {
  await deleteIndex(indexName);
  await CreateIndexIfNotExists(indexName);
  const dataset = await getDataSet();
  const res = await insertDocuments(indexName, dataset);
  console.log("insert result", res);
  console.log("Finished");
}

run().catch(console.error);
