let customers = [
    { customerID: 1, customerName: "Customer 1", totalBillingAmount: 2500 },
    { customerID: 2, customerName: "Customer 2", totalBillingAmount: 3200 },
    { customerID: 3, customerName: "Customer 3", totalBillingAmount: 4000 },
    { customerID: 4, customerName: "Customer 4", totalBillingAmount: 2800 },
    { customerID: 5, customerName: "Customer 5", totalBillingAmount: 3500 }
  ];
  

  
    let highBillingCustomers = [];
  
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].totalBillingAmount > 3000) {
        highBillingCustomers.push(customers[i]);
      }
    }
  
    if (highBillingCustomers.length === 0) {
      console.log("No customers with total billing amount > Rs. 3000 found.");
    } else {
      console.log("Customers with total billing amount > Rs. 3000:");
      highBillingCustomers.forEach(customer => {
        console.log(`Customer Name: ${customer.customerName}`);
        console.log(`Customer ID: ${customer.customerID}`);
        console.log(`Total Billing Amount: Rs. ${customer.totalBillingAmount}`);
        console.log("---------------");
      });
    }