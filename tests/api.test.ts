import { test, expect } from "@playwright/test";

const baseUrl = "https://restful-booker.herokuapp.com";

test.describe("Restful Booker API Tests", () => {
  test("Create, Fetch, and Delete a booking", async ({ request }) => {
    // Create a new booking
    const newBooking = await request.post(`${baseUrl}/booking`, {
      data: {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    });

    // Verify booking creation
    expect(newBooking.status()).toBe(200);
    const response = await newBooking.json();
    expect(response.bookingid).toBeDefined();
    const bookingId = response.bookingid;

    // Fetch the created booking
    const fetchBooking = await request.get(`${baseUrl}/booking/${bookingId}`);
    expect(fetchBooking.status()).toBe(200);
    const fetchResponse = await fetchBooking.json();

    // Verify booking details
    expect(fetchResponse.firstname).toBe("Jim");
    expect(fetchResponse.lastname).toBe("Brown");

    // Attempt to delete the booking
    const deleteBooking = await request.delete(
      `${baseUrl}/booking/${bookingId}`,
      {
        headers: {
          Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
        },
      }
    );

    // Verify deletion (the API returns 201 for successful deletion)
    expect(deleteBooking.status()).toBe(201);
  });
});
