using { purchaseOrderManagement.db as order } from '../db/schema';

service Purchase_srv {
    
//    @readonly
// local testing user
   @restrict: [
      {
         grant: '*',
         to: 'adminRole'
      },
      {
         grant: 'READ',
         to: 'displayRole'
      }
   ]
   @Capabilities : { 
   ReadRestrictions.Readable: true,
   InsertRestrictions.Insertable : true,
   UpdateRestrictions.Updatable: true,
   DeleteRestrictions.Deletable: false
   }
    entity PurchaseOrder as projection on order.PurchaseOrder;
    entity PurchaseOrderItem as projection on order.PurchaseOrderItem;
    entity Vendor as projection on order.Vendor;

}