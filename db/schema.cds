namespace purchaseOrderManagement.db;
// aspects using cuid
using { cuid , managed } from '@sap/cds/common';

type commonType : String(30);

entity PurchaseOrder : cuid , managed {
   vendor: Association to Vendor;
   address: commonType;
   phone: String(20);
   Items: Composition of many PurchaseOrderItem on Items.Orders = $self;
}

entity PurchaseOrderItem : cuid , managed {
    product: String;
    quantity: Integer;
    price: Decimal;
    Orders: Association to PurchaseOrder;
}

entity Vendor: cuid {
   name: commonType;
   contact_email: commonType
}
