package serverless.bnb.lambda;

import serverless.bnb.lambda.function.BookRoom;

public class TempDriverBookRooms {

    public static void main(String a[]) {

        BookRoom b = new BookRoom();

        String checkIn = "2022-07-01";
        String checkOut = "2022-07-03";
        String userId = "aka1001";
        String roomType = "Executive Room";
        String amountPaid = "100.00";
        String paymentCurrency = "CAD";


        BookRoom.BookRoomInput input = BookRoom.BookRoomInput.builder()
                .checkIn(checkIn)
                .checkOut(checkOut)
                .userId(userId)
                .roomType(roomType)
                .amountPaid(amountPaid)
                .paidCurrency(paymentCurrency)
                .build();

        try {
            if (!input.isValid()) {
                throw new Exception("Bad request invalid input");
            }
            else {
                if (b.isAvailable(input)) {
                    b.createBooking(input);
                } else {
                    System.out.println("The request room is not available for date " + checkIn);
                }
            }
        }
        catch (Exception e) {
            System.err.println("An exception occurred while processing the request :" + e.getMessage());
            e.printStackTrace();
        }

    }
}
