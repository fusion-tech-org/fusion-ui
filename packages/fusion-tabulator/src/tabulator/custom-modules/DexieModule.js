import { Module } from 'tabulator-tables';

export class DexieModule extends Module {
  constructor(table) {
    super(table);

    this.db = null; //hold the database
    this.dbTable = null; // hold the database table name

    // register table options
    this.registerTableOption("dexie", null);
    this.registerTableOption("dexieTable", '');
  }

  //called by the table when it is ready for module interactions
  initialize() {
    console.log('Dexie Module Initialized');
    //check to see if module has been enabled before subscribing to events
    if (this.options("dexie") && this.options("dexieTable")) {

      //copy table options to local variables for ease of access
      this.db = this.options("dexie");
      this.dbTable = this.options("dexieTable");
      // debugger;
      //subscribe to events
      this.subscribe("data-loading", this.requestDataCheck.bind(this));
      this.subscribe("data-load", this.requestData.bind(this));
    }
  }

  //request a remote data load if all the table options were setup correctly
  requestDataCheck(data, params, config, silent) {
    return !!(this.db && this.dbTable);
  }

  //build database query, and return results
  requestData(data, params) {
    console.log('Dexie Module Requesting Data');
    // var query = this.db.table(this.dbTable);

    //check if any filters have been set on the query params
    // if (params.filter) {
    //   params.filter.forEach((filter) => {
    //     query = query.filter(filter.field, filter.type, filter.value);
    //   })
    // }

    //check if any sorters have been set on the query params
    // if (params.sort) {
    //   params.sort.forEach((sorter) => {
    //     query = query.sort(sorter.field, sorter.dir);
    //   })
    // }

    //run query and return promise
    // return query.run();
    return this.db[this.dbTable].toArray();
    //   return new Promise((resolve) => resolve(
    //     [
    //       {
    //         "SEQUENCE_NO": "12641",
    //         "ICD_CODE": "I22.100x002",
    //         "SICD": "I22.100x002",
    //         "SPELL_CODE": "JXXHBZFXJGS",
    //         "WB_CODE": "QNGRNGNN",
    //         "ICD_NAME": "急性下后壁再发心肌梗死",
    //         "DISEASE_CODE": "D",
    //         "INFECT_FLAG": "0",
    //         "CANCER_FLAG": "0",
    //         "VALID_STATE": "1",
    //         "SORT_ID": null,
    //         "OPER_CODE": "9999",
    //         "OPER_DATE": "2021-02-24T10:00:00.000Z",
    //         "SEXTYPE": "A",
    //         "SICD_NAME": null
    //       },
    //     ]
    //   ))
  }
}

DexieModule.moduleName = "DexieModule";