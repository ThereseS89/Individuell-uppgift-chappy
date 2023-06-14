# CHAPPY API - README

## Project description
#
This Api is made for the chatapplication Chappy. It is created with react, node.js and express.js.
<br><br>
## Datamodelling
<br>

### Users:
|Property|DataType|Description|
|--------|--------|-----------|
|username|String|The users name|
|password|String|The users secret password|  
<br><br>


### Messages:

|Property|DataType|Description|
|:-------|  :---: |----------:|
|id      | Number | A uniqe number for every object| 
|sender  | String | The username of the one that sent the message|
|message | String | The text of the message|
|channel | String | the name of the channel the message was sent in|

<br><br>

### Channels:

|Property|Datatype|Description|
|:-------| :-----:| ---------:|
| id     | String | A uniqe number for every object |
| name | String | The name of the channel|

<br><br>      

## Endpoints

|Method|URL   |URL params| Body| Response|
|:-----|------|----------|-----|---------|
| GET  |/users|          |     | List with all the users|
| GET  |/users/|:id|-|A specific user|
| POST |/users| - | req.body: { username, password}| Adds a new user|
| GET  | /channels|-|-| List with all the channels|
| GET  |/channels/|:channelId|-|A specific channel based on id|
| POST |/login|-|req.body: {username, password}| sends a request to login|
| GET |/messages|-|-|List with all the messages|
| POST|/messages|-|req.body: {message, username, channel} | sends a new message|
| PUT |/messages/|:id| req.body: {message}| changes a existing message|
| DELETE | /messages|:id|-|deletes a message|
| GET |/mypage|:id|-|get a specific user|
| PUT |/mypage|:id|re.body: {username, password}| change a existing users username or password|
| DELETE|/mypage|:id|-|deletes a specific user|

# 
Every method returns a string in JSON format like this:

```json
    {
      "id": 1,
      "username": "CrazyCatLady",
      "password": "meow123"
    },
    {
      "id": 2,
      "username": "NinjaPenguin",
      "password": "iceblade"
    },
    {
      "id": 3,
      "username": "CaptainBanana",
      "password": "peels4u"
    }
```
## Credit
#
Therese Sköld 2023
