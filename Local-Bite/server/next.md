# Next tasks


- check vendor api in postmen --done
- check product apis --done
- create new schemas for user and order --done
- create new controllers
    - create userregister --done
    - create userlogin --done
    - implement jwt --done
    - create place order --done
    - create order history --done
    - create vendor dashboard
    - create update status --done
- create new routes --done
- update server.js for routes --done
- add quantity available on productschema and addproduct
- check if product is in stock in frontend and disable order button if stock out or order quantity exeeds available quantity
- test new schemas 
- use bcrypt and jwt in site for security

## Routine Api Checks after changing code

- [x] addven: "/"
- [x] getallven: "/all"
- [x] getvenbyid: "/:id"
- [x] addproduct: "/:vendorId"
- [x] getprobyid: "/product/:vendorId"
- [x] register: '/api/auth/'
- [x] login: "/api/auth/login"
- [x] logout: "/api/auth/logout
- [x] place: '/api/order/place'
- [x] update: '/api/order/updatestatus/:OrderId'
- [x] history: '/api/order/history'