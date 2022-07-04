package serverless.bnb.lambda;

import com.fasterxml.jackson.databind.ObjectMapper;
import serverless.bnb.lambda.function.BrowseRooms;
import serverless.bnb.lambda.model.Room;
import serverless.bnb.lambda.model.RoomType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TempDriverBrowseRooms {

    public static void main(String a[]) {

        BrowseRooms b = new BrowseRooms();
        String checkIn = "2022-07-01";
        String checkOut = "2022-07-03";
        BrowseRooms.SearchCriteria searchCriteria = new BrowseRooms.SearchCriteria(checkIn, checkOut);
        String responseBody;

        if (searchCriteria.validateSearchCriteria()) {
            try {
                Map<RoomType, Long> bookedRoomsByType = b.getBookedRooms(searchCriteria);
                List<Room> rooms = b.getAllRooms();
                System.out.println("All rooms :" + rooms.size());
                List<Room> availableRooms = new ArrayList<>();
                for (Room room : rooms) {
                    if (bookedRoomsByType.containsKey(room.getRoomType())
                            && bookedRoomsByType.get(room.getRoomType()) >= room.getTotalRooms()) {
                        continue;
                    } else {
                        availableRooms.add(room);
                    }
                }

                BrowseRooms.BrowseRoomsResponse browseRoomsResponse = new BrowseRooms.BrowseRoomsResponse(true, availableRooms);
                responseBody = new ObjectMapper().writeValueAsString(browseRoomsResponse);
                System.out.println("JSON Response body string :\n" + responseBody);
            } catch (Exception e) {
                System.err.println("An exception occurred:" + e.getMessage());
            }
        }
    }
}
