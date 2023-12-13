// Apply settings across all columns
export const defaultColDef = {
  filter: true // Enable filtering on all columns
};

export const defaultRows = [
  {
    mission: 'Voyager',
    company: 'NASA',
    location: 'Cape Canaveral',
    date: '1977-09-05',
    rocket: 'Titan-Centaur ',
    price: 86580000,
    successful: true,
  },
  // {
  //   mission: 'Apollo 13',
  //   company: 'NASA',
  //   location: 'Kennedy Space Center',
  //   date: '1970-04-11',
  //   rocket: 'Saturn V',
  //   price: 3750000,
  //   successful: false,
  // },
  // {
  //   mission: 'Falcon 9',
  //   company: 'SpaceX',
  //   location: 'Cape Canaveral',
  //   date: '2015-12-22',
  //   rocket: 'Falcon 9',
  //   price: 9750000,
  //   successful: true,
  // },
];

export const defaultColDefs = [
  { field: 'mission' },
  { field: 'company' },
  { field: 'location' },
  { field: 'date' },
  { field: 'price' },
  { field: 'successful' },
  { field: 'rocket' },
];

// Custom Cell Renderer (Display flags based on cell value)
const CompanyLogoRenderer = (cell: any) => {
  // console.log(cell);
  // debugger;
  return (
    <span style={{ display: "flex", height: "100%", width: "100%", alignItems: "center" }}>
      {/* {cell.value && <img alt={`${cell.value} Flag`} src={`https://www.ag-grid.com/example-assets/space-company-logos/${cell.value.toLowerCase()}.png`} style={{ display: "block", width: "25px", height: "auto", maxHeight: "50%", marginRight: "12px", filter: "brightness(1.1)" }} />} */}
      <p style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
        {cell.value} + 7777
      </p>
    </span>
  );
};

export const customCellColDefs = [
  ...defaultColDefs,
  {
    field: "company",
    // Add component to column via cellRenderer
    cellRenderer: CompanyLogoRenderer,
    extra: {
      type: 'customType'
    }
  }
];
