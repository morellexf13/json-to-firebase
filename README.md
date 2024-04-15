<div align="center">
  <h1>
    <br/>
    🔥
    <br />
    <br />
    JSON to Firebase
    <br />
    <br />
  </h1>
  <sup>
    <br />
   Import entire collections to your firestore database using JSON files</em>
    <br />
    <br />

</div>

<br/>

##  How to use it?


1- Create a **.env** file and add **FIREBASE_DATABASE_URL={YOUR DATABASE URL}**. You can obtain that value here:
https://console.firebase.google.com/u/2/project/{YOUR PROJECT ID}/settings/serviceaccounts/adminsdk

2- On the same page generate a new private key file using the button. Save that file in the root of this project with the name **service_key.json**

3- Make sure to move your json collections to the files folder following the same name as your collection. i.e. users.json and using this sample:

```json
[{
    "name": "John Doe",
    "email": "john@doe.com"
}]

```

4- Run the following command to install node dependencies

```bash
npm install
```

5- Import your collection to the firestore database using the following command:
```bash
node uploader.js
```


