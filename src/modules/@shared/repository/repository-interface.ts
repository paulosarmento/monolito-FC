export interface RepositoryInterface<T> {
  add(entity: T): Promise<void>;
}
export interface RepositoryClientInterface<T> {
  addClient(entity: T): Promise<void>;
}
