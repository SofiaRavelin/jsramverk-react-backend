## React Backend
Installations:
```
npm init
npm install express cors morgan --save
npm install -g nodemon
npm install bcryptjs --save
npm install jsonwebtoken --save
```

Run db:
```
cd db
sqlite3 texts.sqlite
 .read migrate.sql
 .exit
```

Start express app:
```
npm start
```
