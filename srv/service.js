const cds = require('@sap/cds');
// const { results } = require('@sap/cds/lib/utils/cds-utils');

class Purchase_srv extends cds.ApplicationService {
    Init() {
        const { PurchaseOrder, PurchaseOrderItem, Vendor } = this.entities
        
         this.before('UPDATE', 'PurchaseOrderItem', (req) => {
            debugger;
            const { quantity,price } = req.data;
            if (quantity == null || quantity === 0) {
              req.error(400, 'Quantity cannot be zero');
             }
             if (price == null || price === 0) {
                req.error(400, 'Price cannot be zero');
             }
           });
    
          this.after('READ' ,'Vendor', (results,req) => {
            // debugger;
            let data = results.map((item => {
              item.category = 1;
              return item;
            }));
            return req.data = data;
           });


      this.on('READ', 'PurchaseOrder', async(req,res) => {
         debugger;
         let{ PurchaseOrder } = this.entities;
         let result = [];
         let wherecondition = req.data;

         if (wherecondition.hasOwnProperty("ID")) {
             result = await cds.tx(req).run(SELECT.from(PurchaseOrder).where(wherecondition));
         } else {
          result = await cds.tx(req).run(SELECT.from(PurchaseOrder).limit(2));
         }
         return result;
      });

      this.on('UPDATE' , PurchaseOrder, async (req,res) => {
        debugger;
        
        let{ PurchaseOrder } = this.entities;
        let returnData = await cds.tx(req).run([

          UPDATE(PurchaseOrder).set({
            "vendor_ID": req.data.vendor_ID
          }).where({
            ID: req.data.ID
          })
        ]).then((resolve, reject) => {
          if (typeof(resolve) !== undefined) {
            return req.data;
          } else {
            req.data(500, "There was an issue in update")
          }

        }).catch(err => {
          req.error(500, "There was an Error" + err.tostring());
        });

        return returnData;
      });


         return super.init();
    }
}

module.exports = Purchase_srv;