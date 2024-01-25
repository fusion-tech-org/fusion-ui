import Dexie from 'dexie';

import seedData from './seed.json';

interface Herbars {
  id?: number;
  SEQUENCE_NO?: string;
  ICD_CODE?: string;
  SICD?: string;
  SPELL_CODE?: string;
  WB_CODE?: string;
  ICD_NAME?: string;
  DISEASE_CODE?: string;
  INFECT_FLAG?: string;
  CANCER_FLAG?: string;
  VALID_STATE?: string;
  SORT_ID?: string;
  OPER_CODE?: string;
  OPER_DATE?: string;
  SEXTYPE?: string;
  SICD_NAME?: string;
}

class FusionDB extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instantiated by Dexie in stores() method)
  herbars!: Dexie.Table<Herbars, number>; // number = type of the primkey
  drug_list!: Dexie.Table<Herbars, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super('fusion_db');
    this.version(1).stores({
      herbars: '++id, SEQUENCE_NO',
      drug_list: '++id, SEQUENCE_NO',
      //...other tables goes here...
    });
  }
}

export const db = new FusionDB();

// db.version(1).stores({
//   herbars: '++id, SEQUENCE_NO', // Primary key and indexed props
// });

// db.on('error', function (error) {
//   switch (error.name) {
//       case Dexie.errnames.OpenFailed:
//           const innerError = error.inner;
//           console.log ("open failed due to " + innerError.name);
//           break;
//       default:
//           console.log ("error: " + e.message);
//   }
// });

export async function seed() {
  const count = await db.herbars.count();

  if (count > 0) return;
  await db.drug_list.bulkAdd([]);
  await db.herbars.bulkAdd(seedData.MET_COM_ICD10);
}
