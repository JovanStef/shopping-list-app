import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  type CollectionReference,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase";
import type { IdentifiableEntity } from "./entity-util.service";

export abstract class ApiService<T extends IdentifiableEntity> {
  protected abstract readonly collectionName: string;

  private get collectionRef(): CollectionReference<DocumentData> {
    return collection(db, this.collectionName);
  }

  private mapSnapshotToEntity(snapshot: DocumentData, snapshotId: string): T {
    const data = snapshot as T;
    const id = data.id ?? Number(snapshotId);

    return { ...data, id } as T;
  }

  async getAll(): Promise<T[]> {
    const querySnapshot = await getDocs(this.collectionRef);

    return querySnapshot.docs.map((snapshot) =>
      this.mapSnapshotToEntity(snapshot.data(), snapshot.id),
    );
  }

  async getById(id: number): Promise<T> {
    const docRef = doc(this.collectionRef, String(id));
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error(`${this.collectionName} item not found`);
    }

    return this.mapSnapshotToEntity(snapshot.data(), snapshot.id);
  }

  async create(payload: Omit<T, "id"> | T): Promise<T> {
    const payloadWithId = payload as Partial<T>;
    const id =
      payloadWithId.id && payloadWithId.id > 0
        ? payloadWithId.id
        : await this.generateNextId();

    const entity = { ...payloadWithId, id } as T;

    await setDoc(doc(this.collectionRef, String(id)), entity as DocumentData);

    return entity;
  }

  async update(id: number, payload: Partial<T>): Promise<T> {
    const docRef = doc(this.collectionRef, String(id));
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error(`${this.collectionName} item not found`);
    }

    await updateDoc(docRef, payload as Partial<DocumentData>);

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const docRef = doc(this.collectionRef, String(id));
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error(`${this.collectionName} item not found`);
    }

    await deleteDoc(docRef);
  }

  private async generateNextId(): Promise<number> {
    const items = await this.getAll();

    if (!items.length) {
      return 1;
    }

    return Math.max(...items.map((entry) => entry.id)) + 1;
  }
}
