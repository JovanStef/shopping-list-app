export interface IdentifiableEntity {
  id: number;
}

export interface NamedEntity extends IdentifiableEntity {
  name: string;
}

export interface CollectionEntity extends NamedEntity {
  items: number[];
}

export abstract class EntityUtilService<T extends NamedEntity> {
  sort(items: T[], direction: "asc" | "desc" = "asc"): T[] {
    return [...items].sort((first, second) => {
      const comparison = first.name.localeCompare(second.name);
      return direction === "asc" ? comparison : -comparison;
    });
  }

  filter(items: T[], query: string): T[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [...items];
    }

    return items.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery),
    );
  }

  find(items: T[], id: number): T | undefined {
    return items.find((item) => item.id === id);
  }

  transform<R, D = unknown>(
    items: T[],
    mapper: (item: T) => R,
    indexedDataMapper?: (item: T, indexedData: D | undefined) => D,
  ): {
    transformedItems: R[];
    enteties: Record<string, R>;
    indexedData: D | undefined;
  } {
    let transformedItems: R[] = [];
    let indexedData: D | undefined = undefined;
    const enteties: Record<string, R> = {};

    items.forEach((item) => {
      const temp = mapper(item);

      if (indexedDataMapper) {
        indexedData = indexedDataMapper(item, indexedData);
      }

      transformedItems.push(temp);
      enteties[item.id] = temp;
    });

    return { transformedItems, enteties, indexedData };
  }
}
