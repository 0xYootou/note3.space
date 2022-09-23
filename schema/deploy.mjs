import { ModelManager } from "@glazed/devtools";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import { model as basicProfileModel } from "@datamodels/identity-profile-basic";
import { model as cryptoAccountsModel } from "@datamodels/identity-accounts-crypto";
import { model as webAccountsModel } from "@datamodels/identity-accounts-web";

const seed = fromString(
  "f9b69a0b6fdbd139c97b717c02dbaaa59fabfb1593ed428eca8c4e1a5bf38349",
  "base16"
);
// `seed` must be a 32-byte long Uint8Array
async function authenticateDID(_seed) {
  const provider = new Ed25519Provider(_seed);
  const did = new DID({ provider, resolver: getResolver() });
  await did.authenticate();
  return did;
}
const did = await authenticateDID(seed);
const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");
await ceramic.setDID(did);
const dataStore = new DIDDataStore(ceramic);
const manager = new ModelManager({ ceramic });

await manager.createSchema("Note3", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Note3",
  type: "object",
  properties: {
    title: {
      type: "string",
      maxLength: 150,
      nullable: true,
    },
    content: {
      type: "string",
      maxLength: 10000,
      nullable: true,
    },
    images: {
      type: "array",
      items: {
        type: "string",
        pattern: "^ipfs://.+",
        maxLength: 150,
      },
      nullable: true,
    },
    create_at: {
      type: "string",
      format: "date",
      maxLength: 20,
      nullable: true,
    },
    update_at: {
      type: "string",
      format: "date",
      maxLength: 20,
      nullable: true,
    },
  },
});

const notesSchema = await manager.createSchema("Note3s", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Note3s",
  type: "object",
  properties: {
    records: {
      type: "array",
      items: {
        type: "string",
        pattern: "^ceramic://.+(\\?version=.+)?",
        maxLength: 200,
      },
      nullable: true,
    },
  },
});
const myNotesDef = await manager.createDefinition("myNotes", {
  name: "My note list",
  description: "My note list description",
  schema: manager.getSchemaURL(notesSchema),
});
manager.addJSONModel(basicProfileModel);
manager.addJSONModel(cryptoAccountsModel);
manager.addJSONModel(webAccountsModel);

console.log("create success");
const modelAliases = await manager.deploy();

console.log("deploy success");
console.log(modelAliases);

const model = new DataModel({ ceramic, aliases: modelAliases });
const store = new DIDDataStore({ ceramic, model });

const newNote = await model.createTile("Note3", {
  title: "My new note",
  content: "hello world",
});
console.log(newNote.id);
const newNote2 = await model.createTile("Note3", {
  title: "My new note 2",
  content: "hello world 2",
});
console.log(newNote2.id);

console.log("myNotesDef", myNotesDef);

await store.setRecord(myNotesDef, [newNote.id, newNote2.id]);

const records = await store.getRecord(myNotesDef);

console.log("notes:", records);
