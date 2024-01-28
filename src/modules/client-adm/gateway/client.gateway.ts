import Client from "../domain/client.entity";

export default interface ClientGateway {
  addClient(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
