export interface RepositoryInterface<T> {
  add(entity: T): Promise<void>;
}
