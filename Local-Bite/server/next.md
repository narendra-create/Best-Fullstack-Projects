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

- [ ] addven: "/"
- [ ] getallven: "/all"
- [ ] getvenbyid: "/:id"
- [ ] addproduct: "/:vendorId"
- [ ] getprobyid: "/product/:vendorId"
- [ ] register: '/api/auth/'
- [ ] login: "/api/auth/login"
- [ ] logout: "/api/auth/logout"
- [ ] place: '/api/order/place'
- [ ] update: '/api/order/updatestatus/:OrderId'
- [ ] history: '/api/order/history'