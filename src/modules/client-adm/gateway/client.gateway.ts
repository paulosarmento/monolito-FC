import { RepositoryClientInterface } from "../../@shared/repository/repository-interface";
import Client from "../domain/client.entity";

export default interface ClientGateway
  extends RepositoryClientInterface<Client> {
  addClient(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
