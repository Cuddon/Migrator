/*
 *   Step stencil definition file
 *
 *   The following API is available/exposed to each stencil:
 *   project
 *   model
 *   step
 * */

var ID = "5d49692b-8bd5-40d2-bf56-e025b9e02c9b"; // Unique UUID. Source: https://www.uuidgenerator.net/
var VERSION = "v0.0.0 (Jan 2017)";
var ABOUT =    {
    _id: ID,
    name: "Load a delimited text file",
    description: "What the step does. Max 100 chars",
    category: "Doovas",
    authors: ['Andrew Cuddon', 'Fred Nerk'],
    tags: ["CSV", "Text File", "delimiter"],
    version: VERSION,
    accounts: [100, 0]
};

fields[ID] = {};

// Inputs Tab
fields[ID].input = [
    {
        type: "vertical-spacer"
    },
    {
        // Input file field
        type: "file-select-field",
        id: "input-filename",
        fieldName: "inputFilename",
        icon: "file-upload",
        label: "Input file",
        default: null,
        validation: {
            mandatory: true,
            pattern: "^.{1,1024}$",     // Regex
            message: "Must be between 1 and 1024 characters"
        },
        fullWidth: true,
        columnWidth: 8    // column values (max 12)
    },
    {
        // Header row checkbox
        type: "checkbox",
        id: "header-row-checkbox",
        fieldName: "headerRow",
        icon: null,
        label: "Header row contains field names",
        default: true,      // Checked
        validation: {
            mandatory: false,
            pattern: null,     // Regex
            message: null
        },
        fullWidth: false,
        columnWidth: 10
    },
    {
        // Delimiter field
        type: "text-field",
        id: "delimiter",
        fieldName: "delimiter",
        icon: null,
        label: "Field separator",
        default: ",",
        validation: {
            mandatory: true,
            pattern: "^[\,\|]",     // Regex
            message: "Must be a single character such as a comma, tab, pipe"
        },
        fullWidth: false,
        columnWidth: 2
    }
];

// Transform Tab
fields[ID].transform = [
    {
        // Ignore row numbers field
        type: "text-field",
        id: "ignore-row-numbers",
        fieldName: "ignoreRowNumbers",
        icon: null,
        label: "Ignore row numbers",
        default: null,
        validation: {
            mandatory: false,
            pattern: "^[0-9]([0-9\,\-]*[0-9])*$",     // Regex
            message: "Invalid row list. Example: 1,5,10-15"
        },
        fullWidth: false,
        columnWidth: 6
    },
    {
        // Ignore rows containing field
        type: "text-field",
        id: "ignore-rows-containing",
        fieldName: "ignoreRowsContaining",
        icon: null,
        label: "Ignore rows containing",
        default: null,
        validation: {
            mandatory: false,
            pattern: null,
            message: "Must be a list of words or phases separated by a comma"
        },
        fullWidth: true,
        columnWidth: 8
    }

];

// Outputs Tab
fields[ID].output = [
    {
        // Output file location
        type: "text-field",
        id: "output-file-location",
        fieldName: "outputFileLocation",
        icon: null,
        label: "Output file location",
        default: null,
        validation: {
            mandatory: false,
            pattern: null,
            message: null
        },
        fullWidth: true
    }

];

// Run Tab
fields[ID].run = [];

// Settings Tab
fields[ID].settings = [
    {
        // Temp file location
        type: "text",
        id: "temp-file-location",
        fieldName: "tempFileLocation",
        icon: null,
        label: "Temporary file location",
        default: null,
        validation: {
            mandatory: false,
            pattern: null,
            message: null
        },
        fullWidth: true
    }
];

// Help
fields[ID].help = [
    {
        type: "section-heading",
        level: "bold",
        value: "Stencil info"
    },
    {
        // Stencil Name
        type: "stencil-value",
        label: "Name",
        value: ABOUT.name
    },
    {
        // Stencil version
        type: "stencil-value",
        label: "Version",
        value: ABOUT.version
    },
    {
        // Stencil _id
        type: "stencil-value",
        label: "ID",
        value: ABOUT._id
    },
    {
        // Stencil description
        type: "stencil-value",
        label: "Description",
        value: ABOUT.description
    },
    {
        // Stencil description
        type: "stencil-value",
        label: "Category",
        value: ABOUT.category
    },
    {
        // Stencil Authors
        type: "stencil-value",
        label: "Authors",
        value: _.reduce(ABOUT.authors, function(memo, num) {
            return memo + ", " + num;
        })
    },

    {
        // Stencil Tags
        type: "stencil-value",
        label: "Tags",
        value: _.reduce(ABOUT.tags, function(memo, num) {
            return memo + ", " + num;
        })
    },
    {
        type: "section-heading",
        level: "bold",
        value: "Help"
    }
];


/**
 *  Functions/methods go here
 */