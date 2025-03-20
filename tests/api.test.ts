import { test, expect } from "@playwright/test";

const baseUrl = "https://restful-booker.herokuapp.com";
let bookingId: number;

test.describe("Restful Booker API Tests", () => {
  test("Create a new booking", async ({ request }) => {
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
    expect(newBooking.status()).toBe(200);

    const response = await newBooking.json();
    //console.log(response);
    expect(response.bookingid).toBeDefined();
    bookingId = response.bookingid;
    //console.log(bookingId);
  });

  test("Fetch booking by given ID", async ({ request }) => {
    expect(bookingId).toBeDefined();
    const fetchBooking = await request.get(`${baseUrl}/booking/${bookingId}`);
    expect(fetchBooking.status()).toBe(200);

    const fetchResponse = await fetchBooking.json();
    //console.log(fetchResponse);
  });

  test("Delete a booking with given ID", async ({ request }) => {
    const deleteBooking = await request.get(`${baseUrl}/booking/${bookingId}`);
    expect(deleteBooking.status()).toBe(200);
    const deleteResponse = await deleteBooking.json();
    //console.log(deleteResponse);
  });
});
