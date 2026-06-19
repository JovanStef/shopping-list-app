import categories from "./domains/category/data.js";
import groups from "./domains/group/data.js";
import items from "./domains/shopping-item/data.js";
import lists from "./domains/shopping-list/data.js";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// 3. Import data to Firestore

async function importCollection(name, data) {
  for (const entry of data) {
    await setDoc(doc(collection(db, name), String(entry.id)), entry);
    console.log(`Inserted ${name}/${entry.id}`);
  }
}

// 4. Run imports
export async function run() {
  await importCollection("categories", categories);
  await importCollection("groups", groups);
  await importCollection("items", items);
  await importCollection("lists", lists);
  console.log("All data imported successfully!");
}
