package serverless.bnb.lambda.function;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import serverless.bnb.lambda.DynamoDB;
import serverless.bnb.lambda.model.RoomBooking;
import serverless.bnb.lambda.model.RoomType;
import serverless.bnb.lambda.model.Status;

import java.util.*;

public class ViewBookings implements
        RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        APIGatewayProxyResponseEvent response = null;
        Map<String, String> queryParams = input.getQueryStringParameters();
        String bookingNumber = queryParams.get("bookingNumber");
        String userId = queryParams.get("userId");
        try {
            SearchCriteria searchCriteria = new SearchCriteria(bookingNumber, userId);
            if (searchCriteria.validate()) {
                List<RoomBooking> bookings = fetchBookings(searchCriteria);
                if (Optional.ofNullable(bookings).isEmpty() || bookings.size() == 0) {
                    String plainTextResponse = "No bookings found";
                    response = getAPIGatewayResponse(200, plainTextResponse, "text/plain");
                }
                else
                {
                    System.out.println("Bookings found: " + bookings.size());
                    ObjectMapper mapper = new ObjectMapper();
                    String jsonResponse = mapper.writeValueAsString(bookings);
                    response = getAPIGatewayResponse(200, jsonResponse, "application/json");
                }
            }
            else
            {
                response = getAPIGatewayResponse(400, "Bad request", "text/plain");
            }
        }
        catch (Exception exception) {
            System.out.println("An exception occurred while processing the View Bookings Lambda: " + exception.getLocalizedMessage());
            exception.printStackTrace();
        }
        return response;
    }

    private List<RoomBooking> fetchBookings(SearchCriteria criteria) {
        DynamoDBMapper mapper = DynamoDB.getMapper();

        Map<String, AttributeValue> expression = criteria.getDynamoDBSearchExpressionValues();
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression(criteria.getScanExpression())
                .withExpressionAttributeValues(expression);

        return mapper.scan(RoomBooking.class, scanExpression);
    }

    private APIGatewayProxyResponseEvent getAPIGatewayResponse(int statusCode, String responseBody, String contentType) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setBody(responseBody);
        response.setStatusCode(statusCode);
        Map<String, String> headers = new HashMap<>();
        headers.put("X-Custom-Header", "Response: Browse Rooms");
        headers.put("Content-Type", contentType);
        headers.put("Access-Control-Allow-Origin", "*");
        response.setHeaders(headers);
        return response;
    }

    @Getter
    public static class SearchCriteria {

        private String bookingNumber;
        private String userId;
        private boolean hasBookingNumber;
        private boolean hasUserId;

        public SearchCriteria(String bookingNumber, String userId) {
            this.bookingNumber = bookingNumber;
            this.userId = userId;
            hasBookingNumber = Objects.nonNull(bookingNumber) && !bookingNumber.isBlank();
            hasUserId = Objects.nonNull(userId) && !userId.isBlank();
        }

        boolean validate() {
            return hasBookingNumber || hasUserId;
        }

        public Map<String, AttributeValue> getDynamoDBSearchExpressionValues() {
            Map<String, AttributeValue> expression = new HashMap<>();
            if (hasBookingNumber) {
                expression.put(":bookingNumber", new AttributeValue().withS(bookingNumber));
            } else if (hasUserId) {
                expression.put(":userId", new AttributeValue().withS(userId));
            }
            return expression;
        }

        private String getScanExpression() {
            List<String> expressions = new ArrayList<>();
            if(hasBookingNumber) expressions.add("BookingNumber = :bookingNumber");
            if(hasUserId) expressions.add("UserId = :userId");

            StringBuilder query = new StringBuilder();
            if (expressions.size() > 1) {
                for (int i =0; i < expressions.size(); i++) {
                    if (i % 2 == 0) {
                        query.append(expressions.get(0)).append(" ");
                    } else {
                        query.append(expressions.get(0)).append(" AND ");
                    }
                }
            }
            System.out.println("The query is " + query);
            return query.toString();
        }

    }

    @Getter
    @Setter
    @ToString
    public static class ViewBookingsResponse {
        private String bookingNumber;
        private String userId;
        private RoomType roomType;
        private Calendar checkIn;
        private Calendar checkOut;
        private Calendar bookingDate;
        private float amountPaid;
        private Status status;
    }
}
