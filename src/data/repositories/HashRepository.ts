export interface HashRepository {
  hash: (data: string) => Promise<string>
}
