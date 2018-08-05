# Estime

## Running

Make sure to add `config.prod.js` and `config.test.js` files in the `config` folder. See the example there for more details.

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```

Add test ideas:

```shell
node ./tools/create-test-ideas.js --generate={count}
```

##API Reference
###Categories
#### GET /api/categories
Get categories list.
#####Response
```
{ "categories": [
  {
    "_id": "59d21649756adfd43f540412",
    "slug": "criminal-justice",
    "__v": 0,
    "name": "Criminal Justice"
  },
  {...},
  ]
}
```
#### POST /api/categories
`Authenticated user (admin) only!`
Add new category.
#####Request
```
{
   "name": "Cat 2",
   "slug": "cat2"
}
```
#####Response
```
{"category":
 {"__v": 0,
  "name": "Cat 2",
  "slug": "cat2",
  "_id": "59d376a8a1c55523e5dc3397"
  }
}
```
#### DELETE /api/categories/:id
`Authenticated user (admin) only!`
Delete category.
#####Response
```
{
  "status": "deleted"
}
```

###Ideas
#### GET /api/ideas
Get all ideas.
#####Response
```
[{
        "_id": "59d216e945850a2c6d26be98",
        "politicalSpectrum": {
            "_id": "59d21649756adfd43f54041e",
            "slug": "little-conservative",
            "__v": 0,
            "value": 3,
            "example": "A little Conservative"
        },
        "text": "Idea 1",
        "__v": 0,
        "created": "2017-10-03T13:30:12.212Z",
        "accepted": false,
        "categories": [{
                "_id": "59d21649756adfd43f540415",
                "slug": "education",
                "__v": 0,
                "name": "Education"
            },
            {
                "_id": "59d21649756adfd43f540418",
                "slug": "health",
                "__v": 0,
                "name": "Health"
            }
        ]
    },
    { ... }
]
```
#### GET /api/ideas/accepted
Get all accepted ideas.
#####Response
```
[{
        "_id": "59d216e945850a2c6d26be98",
        "politicalSpectrum": {
            "_id": "59d21649756adfd43f54041e",
            "slug": "little-conservative",
            "__v": 0,
            "value": 3,
            "example": "A little Conservative"
        },
        "text": "Idea 1",
        "__v": 0,
        "created": "2017-10-03T13:30:12.212Z",
        "accepted": true,
        "categories": [{
                "_id": "59d21649756adfd43f540415",
                "slug": "education",
                "__v": 0,
                "name": "Education"
            },
            {
                "_id": "59d21649756adfd43f540418",
                "slug": "health",
                "__v": 0,
                "name": "Health"
            }
        ]
    },
    { ... }
]
```

#### GET /api/ideas/accepted_from_date/:date
Get all accepted ideas from date.
#####Response
```
[{
        "_id": "59d216e945850a2c6d26be98",
        "politicalSpectrum": {
            "_id": "59d21649756adfd43f54041e",
            "slug": "little-conservative",
            "__v": 0,
            "value": 3,
            "example": "A little Conservative"
        },
        "text": "Idea 1",
        "__v": 0,
        "created": "2017-10-03T13:30:12.212Z",
        "accepted": true,
        "categories": [{
                "_id": "59d21649756adfd43f540415",
                "slug": "education",
                "__v": 0,
                "name": "Education"
            },
            {
                "_id": "59d21649756adfd43f540418",
                "slug": "health",
                "__v": 0,
                "name": "Health"
            }
        ]
    },
    { ... }
]
```

#### GET /api/ideas/from_date/:date
Get all ideas from date.
#####Response
```
[{
        "_id": "59d216e945850a2c6d26be98",
        "politicalSpectrum": {
            "_id": "59d21649756adfd43f54041e",
            "slug": "little-conservative",
            "__v": 0,
            "value": 3,
            "example": "A little Conservative"
        },
        "text": "Idea 1",
        "__v": 0,
        "created": "2017-10-03T13:30:12.212Z",
        "accepted": true,
        "categories": [{
                "_id": "59d21649756adfd43f540415",
                "slug": "education",
                "__v": 0,
                "name": "Education"
            },
            {
                "_id": "59d21649756adfd43f540418",
                "slug": "health",
                "__v": 0,
                "name": "Health"
            }
        ]
    },
    { ... }
]
```

#### GET /api/ideas/from_date/:date/limit/:limit/:page
Get pagineted ideas from date.

**Limit** - max amount of records
**Page** - page number
**Date** - date in format yyyy-mm-dd

#####Response
```
{
   "docs":[
      {
         "_id":"59df0858fad5e30733b9c716",
         "politicalSpectrum":{
            "_id":"59d21649756adfd43f54041e",
            "slug":"little-conservative",
            "__v":0,
            "value":3,
            "example":"A little Conservative"
         },
         "text":"1",
         "__v":0,
         "created":"2017-10-12T06:14:48.755Z",
         "accepted":true,
         "categories":[
            {
               "_id":"59d21649756adfd43f540415",
               "slug":"education",
               "__v":0,
               "name":"Education"
            },
            {
               "_id":"59d21649756adfd43f540418",
               "slug":"health",
               "__v":0,
               "name":"Health"
            }
         ]
      }
   ],
   "total":1,
   "limit":1,
   "page":1,
   "pages":1
}
```

#### GET /api/ideas/accepted_from_date/:date/limit/:limit/:page
Get pagineted accepted ideas from date.

**Limit** - max amount of records
**Page** - page number
**Date** - date in format yyyy-mm-dd

#####Response
```
{
   "docs":[
      {
         "_id":"59df0858fad5e30733b9c716",
         "politicalSpectrum":{
            "_id":"59d21649756adfd43f54041e",
            "slug":"little-conservative",
            "__v":0,
            "value":3,
            "example":"A little Conservative"
         },
         "text":"1",
         "__v":0,
         "created":"2017-10-12T06:14:48.755Z",
         "accepted":true,
         "categories":[
            {
               "_id":"59d21649756adfd43f540415",
               "slug":"education",
               "__v":0,
               "name":"Education"
            },
            {
               "_id":"59d21649756adfd43f540418",
               "slug":"health",
               "__v":0,
               "name":"Health"
            }
         ]
      }
   ],
   "total":1,
   "limit":1,
   "page":1,
   "pages":1
}
```

#### POST /api/ideas
Add new idea.
#####Request
```
{
    "politicalSpectrum": "59d21649756adfd43f54041e",
    "categories": ["59d21649756adfd43f540415", "59d21649756adfd43f540418"],
    "text": "String sdfgremgrf"
}
```
#####Response
```
{
    "idea": {
        "__v": 0,
        "politicalSpectrum": "59d21649756adfd43f54041e",
        "text": "String sdfgremgrf",
        "_id": "59d39140c5eb2c298b31b1e5",
        "created": "2017-10-03T13:31:44.849Z",
        "accepted": false,
        "categories": [
            "59d21649756adfd43f540415",
            "59d21649756adfd43f540418"
        ]
    }
}
```
#### PUT /api/ideas/accept/:id
`Authenticated user (admin) only!`
Accept an idea.

#####Response
```
{
    "idea": {
        "_id": "59d39140c5eb2c298b31b1e5",
        "politicalSpectrum": {
            "_id": "59d21649756adfd43f54041e",
            "slug": "little-conservative",
            "__v": 0,
            "value": 3,
            "example": "A little Conservative"
        },
        "text": "String sdfgremgrf",
        "__v": 0,
        "created": "2017-10-03T13:31:44.849Z",
        "accepted": true,
        "categories": [{
                "_id": "59d21649756adfd43f540415",
                "slug": "education",
                "__v": 0,
                "name": "Education"
            },
            {
                "_id": "59d21649756adfd43f540418",
                "slug": "health",
                "__v": 0,
                "name": "Health"
            }
        ]
    }
}
```
#### PUT /api/ideas/reject/:id
`Authenticated user (admin) only!`
Reject an idea.
#####Response
```
{
    "idea": {
        "_id": "59d39140c5eb2c298b31b1e5",
        "politicalSpectrum": {
            "_id": "59d21649756adfd43f54041e",
            "slug": "little-conservative",
            "__v": 0,
            "value": 3,
            "example": "A little Conservative"
        },
        "text": "String sdfgremgrf",
        "__v": 0,
        "created": "2017-10-03T13:31:44.849Z",
        "accepted": false,
        "categories": [{
                "_id": "59d21649756adfd43f540415",
                "slug": "education",
                "__v": 0,
                "name": "Education"
            },
            {
                "_id": "59d21649756adfd43f540418",
                "slug": "health",
                "__v": 0,
                "name": "Health"
            }
        ]
    }
}
```
#### PUT /api/ideas/:id
`Authenticated user (admin) only!`
Edit an idea.
*Warning* - you cannot accept or reject an idea this way. Use /api/ideas/accept/:id or /api/ideas/reject/:id instead.
#####Request
```
{
   "text": "Edit test 2"
}
```
#####Response
```
{
    "_id": "59d216eb45850a2c6d26be99",
    "politicalSpectrum": {
        "_id": "59d21649756adfd43f54041e",
        "slug": "little-conservative",
        "__v": 0,
        "value": 3,
        "example": "A little Conservative"
    },
    "text": "Edit test 2",
    "__v": 0,
    "accepted": true,
    "categories": [{
            "_id": "59d21649756adfd43f540415",
            "slug": "education",
            "__v": 0,
            "name": "Education"
        },
        {
            "_id": "59d21649756adfd43f540418",
            "slug": "health",
            "__v": 0,
            "name": "Health"
        }
    ]
}
```
#### DELETE /api/ideas/:id
`Authenticated user (admin) only!`
Delete an idea.
#####Response
```
{
    "status": "deleted"
}
```

###Spectrum
#### GET /api/spectrums
Get all spectrum instances.
#####Response
```
{
    "spectrums": [{
            "_id": "59d21649756adfd43f54041b",
            "slug": "elizabeth-warren",
            "__v": 0,
            "value": 0,
            "example": "Elizabeth Warren"
        },
        { ... }
    ]
}
```
#### POST /api/spectrums
`Authenticated user (admin) only!`
Add new spectrum.
#####Request
```
{
    "value": 7,
    "example": "Test Spec",
    "slug": "test_spec"
}
```
#####Response
```
{
    "spectrum": {
        "__v": 0,
        "value": 7,
        "example": "Test Spec",
        "slug": "test_spec",
        "_id": "59d38cf3c5eb2c298b31b1e3"
    }
}
```
#### DELETE /api/spectrums/:id
`Authenticated user (admin) only!`
Delete spectrum.
#####Response
```
{
    "status": "deleted"
}
```

###Users
#### GET /api/users
`Temporary - just for debug purposes!`
`Authenticated user (admin) only!`
#####Response
```
[{
        "_id": "59d3532258906a16f5e5760a",
        "username": "admin",
        "password": "$2a$05$w1fTGR88kPM.4Eq2p8aTguBDanlwnef5f84eowKgDmwjeke0TWJdi",
        "__v": 0
    }
]
```
#### POST /api/users
`Authenticated user (admin) only!`
Add new user (admin).
#####Request
```
{
    "username": "user",
    "password": "password"
}
```
#####Response
```
{
    "message": "User created!"
}
```
#### DELETE /api/users/:user_id
`Authenticated user (admin) only!`
Delete an user.

#####Response
```
{
    "message": "User deleted!",
    "result": {
        "_id": "59d39034c5eb2c298b31b1e4",
        "username": "admin1344",
        "password": "$2a$05$hJlC1d195o988UhAlMeQzuMLO0/FSBQEsApjVnjOslhrMqtwS4DES",
        "__v": 0
    }
}
```
