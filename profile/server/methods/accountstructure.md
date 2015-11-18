
#Account Structure

Requirements:

 * All updates from the client are denied. Changes can be made only via server methods
 * The following fields are published:
    * profile (including all sub-fields)
    * Account:
        * active
        * type
        * description
        * createdAt
        * startDate
    * Roles (including all sub-fields)

Data structure:

    "_id" : "steBxgGk1J",
    "emails" : [ 
        {
            "address" : "boris@example.com",
            "verified" : true
        }
    ],
    "profile" : {
        "name" : "Boris",
        "alias" : "Borizzio"
    },
    "account" : {
        "type" : 100,
        "description" : "Foundation Free",
        "active" : true,
        "startDate" : ISODate("2015-08-28T23:35:04.227Z"),
        "createdBy" : "stStLhaDeBxgGkTaJ",
        "createdAt" : ISODate("2015-08-28T23:35:04.227Z"),
        "updatedBy" : "stStLhaDeBxgGkTaJ",
        "updatedAt" : ISODate("2015-08-28T23:35:04.227Z"),
    },
    "roles" : [ 
        "allUsers", 
        "projectOwner"
    ],
    "history" : [],
    "notes" : []



