fields = {};
/*
 *   Step stencil definition file
 *
 *   The following API is available/exposed to each stencil:
 *   project
 *   model
 *   step
 * */

var ID = "5d49692b-8bd5-40d2-bf56-e025b9e02c9b"; // Unique UUID. Source: https://www.uuidgenerator.net/
var VERSION = "v0.0.0";

fields[ID]={};

// Inputs Tab
fields[ID].input = [
    {
        type: "h2",
        value: "Input parameters"
    },
    {
        // Input file field
        type: "file",
        id: "input-filename",
        fieldName: "inputFilename",
        icon: "file-upload",
        label: "Input file",
        validation: {
            mandatory: true,
            pattern: null,     // Regex
            message: null
        },
        fullWidth: true
    },
    {
        // Header row checkbox
        type: "checkbox",
        id: "header-row-checkbox",
        fieldName: "headerRow",
        checked: true,
        icon: null,
        label: "Header row checkbox",
        validation: {
            mandatory: false,
            pattern: null,     // Regex
            message: null
        },
        fullWidth: false
    },
    {
        // Delimiter field
        type: "text",
        id: "delimiter",
        fieldName: "delimiter",
        checked: true,
        icon: null,
        label: "Delimiter",
        default: ",",
        validation: {
            mandatory: true,
            pattern: "^[\,\|]",     // Regex
            message: "Must be a single character such as a comma, tab, pipe"
        },
        fullWidth: false
    },
    {
        // Ignore rows field
        type: "text",
        id: "ignore-rows",
        fieldName: "ignoreRows",
        icon: null,
        label: "Ignore Rows",
        validation: {
            mandatory: false,
            pattern: "^[0-9]([0-9\,\-]*[0-9])*$",     // Regex
            message: "Invalid row list. Example: 1,5,10-15"
        },
        fullWidth: true
    }

];

// Transform Tab
fields[ID].transform = [];

// Run Tab
fields[ID].run = [];

// Help Tab
fields[ID].help = [];

// About Tab
fields[ID].about = [
    {
        _id: ID,
        category: "Doovas",
        name: "Load a delimited text file",
        description: "What the step does. Mxx 100 chars",
        authors: ['Andrew Cuddon'],
        tags: ["CSV", "Text File", "delimiter"],
        hoverText: " A longer description perhaps",
        version: VERSION,
        accounts: [100]
    }
];


/**
 *  Functions/methods go here
 */