# Installation

```
git clone git@github.com:mikicho/BringgCoffee.git
cd BringgCoffee
npm install
node ./src/app.js
``` 
_* Make sure port 3000 is avlaiable_

# API
### **POST /api/oreders**
Create a new order
```
curl -X POST \
  http://localhost:3000/api/orders \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Michael Solomon",
    "phone": "+972532030509",
    "address": "Tel Aviv",
    "order_details": {
        "title": "Test"
    }
}'
```

### **POST /api/orders/reorder-previous-week/:phone**
Recreate all orders from previous weel
```
curl -X POST \
  'http://localhost:3000/api/orders/reorder-previous-week/+972532030509' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
```