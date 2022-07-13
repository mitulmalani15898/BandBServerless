package serverless.bnb.lambda.model;

import java.util.List;

public class Invoice {

    private String id;
    private String userId;
    private String bookingNumber;
    private List<InvoiceLine> invoiceLines;

}
