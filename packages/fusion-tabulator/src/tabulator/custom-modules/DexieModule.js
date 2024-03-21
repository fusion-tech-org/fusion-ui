import { Module } from 'tabulator-tables';

export class DexieModule extends Module {
  static moduleName = "DexieModule";

  constructor(table) {
    super(table);

    this.db = undefined; //hold the database
    this.dbTable = undefined; // hold the database table name

    // register table options
    this.registerTableOption("dexie", undefined);
    this.registerTableOption("tableName", undefined);
  }

  //called by the table when it is ready for module interactions
  initialize() {
    console.log('Dexie Module Initialized');
    //check to see if module has been enabled before subscribing to events
    if (this.options("dexie") && this.options("tableName")) {

      //copy table options to local variables for ease of access
      this.db = this.options("dexie");
      this.dbTable = this.options("tableName");
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
    console.log('Dexie Module Requesting Data', data, params);
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
  }
}
