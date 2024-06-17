import { client } from "./client";
import { queryStore } from "./loader";


export const { loadQuery } = queryStore;

queryStore.setServerClient(client);
