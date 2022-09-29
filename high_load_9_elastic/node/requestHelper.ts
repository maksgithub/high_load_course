import elasticsearch from "elasticsearch";
import wordlist from "wordlist-english";
import indexBody from "./index.json";

var client = new elasticsearch.Client({
  // hosts: ["http://elasticsearch:9200"],
  hosts: ["http://localhost:9200"],
});

export async function getIndices(): Promise<string[]> {
  const result = await client.cat.indices({ format: "json" });
  return result.map((x) => x.index);
}

export async function search(index: string, query: string): Promise<any[]> {
  const res = await client.search({
    index,
    body: {
      query: {
        match: {
          text: {
            query,
            minimum_should_match: "35%"
          },
        },
      },
    },
  });
  return res.hits.hits.map((x) => x._source);
}

export async function insertDocuments(
  index: string,
  documents: DataItem[]
): Promise<any> {
  const operations = documents.flatMap((doc) => [
    { index: { _index: index } },
    doc,
  ]);
  const bulkResponse = await client.bulk({ refresh: true, body: operations });
  return bulkResponse;
}

export async function deleteIndex(name: string): Promise<void> {
  try {
    await client.indices.delete({ index: name });
  } catch (error) {}
}

export async function createIndex(name: string): Promise<void> {
  await client.indices.create({
    index: name,
    body: indexBody,
  });
}

export async function CreateIndexIfNotExists(name: string): Promise<void> {
  const indices = await getIndices();
  if (!indices.includes(name)) {
    await createIndex(name);
  }
}

export interface DataItem {
  title: string;
}

export async function getDataSet(): Promise<DataItem[]> {
  var englishWords = wordlist["english"];
  const items = englishWords.map((x) => {
    return {
      text: x,
    };
  });
  return items;
}
