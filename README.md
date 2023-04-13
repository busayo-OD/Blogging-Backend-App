# Blogging App
This is a blog app

## Tools and Technologies
- Javascript
- Node.js
- Express
- Mongodb

---

## Requirements
1. User should be able to register 
2. User should be able to login using JWT
3. Implement basic auth
4. Users should be able to get published articles
5. Users should be able to create articles
6. Logged in article owner should be able to update and delete articles
7. Owner of articles should be able to get a list of their articles
8. Logged in and not logged in users can get a list of published articles
9. 
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---
## Base URL
- https://beautiful-singlet-lion.cyclic.app

## Models
---

### User
| field       |  data_type | constraints  |
|-------------|------------|--------------|
|  id         |  string    |  required    |
|  first_name |  string    |  required    |
|  last_name  | string     |  required    |
|  email      |  string    |  required && unique  |
|  password   | string     |  required |
|  articles   |   object   |  ref = Blog |



### Blog
| field         | data_type | constraints  |
|---------------|-----------|--------------|
|  id           |  string   |  required |
|  title        |  string   |  required && unique |
|  description  | string    | optional|
|  author       |  objectId |  required && ref = User|
|  state        | string    |  required , enum: ['draft', 'published']|
|  read_count   |  number   |  default = 0 |
|  reading_time |  object   | optional |
|  tags         |  string   | optional |
|  body         |  string   |  required |


## APIs
---

### Signup User

- Route: https://beautiful-singlet-lion.cyclic.app/register
- Method: POST
- Body: 
```
{
  "first_name": "Busayo",
  "last_name": "Dada",
  "email": "toyinoluwabusayo@gmail.com",
  "password": "bussyj"
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "first_name": "Busayo",
        "last_name": "Dada",
        "email": "toyinoluwabusayo@gmail.com",
        "password": "encrypted characters",
        "articles": [],
        "_id": "generated id"
    }
}

### Login User

- Route: https://beautiful-singlet-lion.cyclic.app/login
- Method: POST
- Body: 
```
{
  "email": "toyinoluwabusayo@gmail.com",
  "password": 'bussyj",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}

### Create Article
## Only a logged in user can create an article
- Route: https://beautiful-singlet-lion.cyclic.app/blogs/create
- Method: POST
- Header
    - Authorization: Bearer {token}
Body: 
```
{
    "title": "On Becoming Bold",
    "description": "A motivational book",
    "tags": "Self Development"
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
- Responses

Success
```
{
    "title": "",
    "description": "",
    "author": "",
    "state": "",
    "read_count": 0,
    "reading_time": {},
    "tags": "",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}


### Update Article from draft state to published state
This operation can only be carried out by the owner of the article

- Route: https://beautiful-singlet-lion.cyclic.app/blogs/state/:id
- Method: PATCH
- Header
    - Authorization: Bearer {token}
Body: 
```
{
    "state": "published"
}

- Responses

Success
```
{
    "title": "",
    "description": "",
    "author": "",
    "state": "published",
    "read_count": 0,
    "reading_time": {},
    "tags": "",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}

### Edit article

This operation can only be carried out by the owner of the article

The following fields can be edited : description, title, body & tags

- Route: https://beautiful-singlet-lion.cyclic.app/blogs/edit/:id
- Method: PATCH
- Header
    - Authorization: Bearer {token}

Body: 
```
{
    Any or all of the fields mentioned above
}

- Responses

Success
```
{
    "title": "",
    "description": "",
    "author": "",
    "state": "",
    "read_count": 0,
    "reading_time": {},
    "tags": "",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}

### Get published Articles

- Route: https://beautiful-singlet-lion.cyclic.app/blogs
- Method: GET

- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - tags
    - title
    - state
    
- Responses

Success
```
{
    "title": "",
    "description": "",
    "author": "",
    "state": "",
    "read_count": 0,
    "reading_time": {},
    "tags": "",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```
### This endpoint allows a logged in user to get a list of his/her articles 

- Route: https://beautiful-singlet-lion.cyclic.app/blogs/owner
- Method: GET

- Header
    - Authorization: Bearer {token}

- Responses

Success
[```
    {
        "title": "",
        "description": "",
        "author": "",
        "state": "",
        "read_count": 0,
        "reading_time": {},
        "tags": "",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
]



### Get a published article

- Route: https://beautiful-singlet-lion.cyclic.app/blogs/:id
- Method: GET

- Responses

Success
```
{
    "title": "",
    "description": "",
    "author": "",
    "state": "",
    "read_count": 0,
    "reading_time": {},
    "tags": "",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}


```

#### A logged in user can delete his/her article with this endpoint

- Route: https://beautiful-singlet-lion.cyclic.app/blogs/delete/:id
- Method: DELETE

- Responses

Success
```
{
    "title": "",
    "description": "",
    "author": "",
    "state": "",
    "read_count": 0,
    "reading_time": {},
    "tags": "",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
