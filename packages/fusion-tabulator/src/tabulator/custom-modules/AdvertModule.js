import { Module, PseudoRow } from 'tabulator-tables'

export class AdvertModule extends Module {
  constructor(table) {
    super(table);

    //register table options
    this.registerTableOption("adverts", false);
    this.registerTableOption("advertInterval", 5);
    this.registerTableOption("advertSrc", "");

    //register table functions
    // this.registerTableFunction("setAdvert", this.setAdvert.bind(this));
  }

  //called by the table when it is ready for module integrations
  initialize() {
    //check to see if module has been enabled beofre regitering handlers
    if (this.options("adverts")) {

      //register data handler after page handler
      this.registerDataHandler(this.dataHandler.bind(this), 60);
    }
  }

  //define data handler function
  dataHandler(rows) {
    var interval = this.options("advertInterval"),
      position = interval;

    //insert adverts every interval
    while (position < rows.length + 1) {
      rows.splice(position, 0, this.advertRow());
      position += interval + 1;
    }

    return rows;
  }

  //create internal row component for the row
  advertRow() {
    var row, el, ad;

    //create pseudo row component
    row = new PseudoRow("advert");

    //get containing element for row
    el = row.getElement();
    el.classList.add("row-advert");

    //create advert contents
    ad = document.createElement("img");
    ad.src = this.options("advertSrc");
    ad.style.width = '100%';
    ad.style.display = 'block';

    //append contents to row
    el.appendChild(ad);

    return row;
  }

  //change advert after the table has been drawn
  setAdvert(src) {
    this.setOption("advertSrc", src);
    this.refreshData(true);
  }
}

AdvertModule.moduleName = "advert";