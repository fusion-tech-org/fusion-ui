import { Module, PseudoRow } from 'tabulator-tables'

export class ExternalInputModule extends Module {
  constructor(table) {
    super(table);

    //register table options
    this.registerTableOption("showInput", false);

    //register table functions
    // this.registerTableFunction("setAdvert", this.setAdvert.bind(this));
  }

  //called by the table when it is ready for module integrations
  initialize() {
    //check to see if module has been enabled beofre regitering handlers
    if (this.options("showInput")) {

      //register data handler after page handler
      this.registerDataHandler(this.dataHandler.bind(this), 60);
    }
  }

  //define data handler function
  dataHandler(rows) {
    rows.push(this.inputRow());
    console.log('dataHandler', '---->');
    return rows;
  }

  //create internal row component for the row
  inputRow() {
    var row, el, inputEle;

    //create pseudo row component
    row = new PseudoRow();

    //get containing element for row
    el = row.getElement();
    el.dataset.frozen = 'true';
    el.classList.add("row-external-input-container");

    //create advert contents
    // inputEle = document.createElement("input");

    // inputEle.style.width = '100%';
    // inputEle.style.display = 'inline-block';

    //append contents to row
    // el.appendChild(inputEle);

    return row;
  }

  //change advert after the table has been drawn
  // setAdvert(src) {
  //   this.setOption("advertSrc", src);
  //   this.refreshData(true);
  // }
}

ExternalInputModule.moduleName = "advert";