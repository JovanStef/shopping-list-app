const MIN_RESPONSE_DELAY_MS = 200;
const MAX_RESPONSE_DELAY_MS = 600;

function getRandomDelayMs(): number {
  return (
    Math.floor(
      Math.random() * (MAX_RESPONSE_DELAY_MS - MIN_RESPONSE_DELAY_MS + 1),
    ) + MIN_RESPONSE_DELAY_MS
  );
}

export function simulateHttpResponse<T>(payload: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), getRandomDelayMs());
  });
}

export function simulateHttpError<T = never>(error: Error): Promise<T> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(error), getRandomDelayMs());
  });
}

export abstract class ApiService<T> {
  protected abstract readonly endpointUrl: string;

  protected async request<R>(path = "", init: RequestInit = {}): Promise<R> {
    const response = await fetch(`${this.endpointUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      ...init,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as R;
    }

    return (await response.json()) as R;
  }

  getAll(): Promise<T[]> {
    return this.request<T[]>("");
  }

  getById(id: number): Promise<T> {
    return this.request<T>(`/${id}`);
  }

  create(payload: Omit<T, "id"> | T): Promise<T> {
    return this.request<T>("", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  update(id: number, payload: Partial<T>): Promise<T> {
    return this.request<T>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  delete(id: number): Promise<void> {
    return this.request<void>(`/${id}`, {
      method: "DELETE",
    });
  }
}
