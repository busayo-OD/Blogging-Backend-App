# Blogging App
This is a blog app

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
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  first_name |  string |  required |
|  last_name | string  |  required|
|  email  |  string |  required && unique  |
|  password     | string  |  required |
|  articles |   object |  ref = Blog |



### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title |  string |  required && unique |
|  description | string  | optional|
|  author  |  objectId |  required && ref = User|
|  state     | string  |  required , enum: ['draft', 'published']|
|  read_count |   number |  default = 0 |
|  reading_time |  object | optional |
|  tags |  string | optional |
|  body |  string |  required |
