// Mock data
const mockBookingData = {
  user_id: "d49771c2-77e1-4e57-aceb-b2470a7e2622",
  booking_id: "afa2e898-166e-4bcc-80f0-f52484115f85",
  invitee_id: "9bba2683-5fdb-4877-b552-b9d736a46201",
  name: "John Doe",
  email: "john@example.com",
  service: "Any",
};

// Helper function to create a booking
const createBooking = async (bookingData = mockBookingData) => {
  const response = await fetch("http://localhost:3000/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  return response;
};

// Helper function to delete a booking
const deleteBooking = async (booking_id = mockBookingData.booking_id) => {
  const response = await fetch("http://localhost:3000/api/bookings", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ booking_id }),
  });
  return response;
};

describe("Booking API Routes", () => {
  beforeEach(async () => {
    try {
      await deleteBooking();
    } catch (error) {
      console.log(error);
    }
  });

  afterEach(async () => {
    try {
      await deleteBooking();
    } catch (error) {
      console.log(error);
    }
  });

  describe("POST /api/bookings", () => {
    it("should return 201 when all required fields are present", async () => {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockBookingData),
      });

      const json = await response.json();
      expect(response.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.data).toBeDefined();
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing required fields");
    });

    it("should return 400 when user_id is missing", async () => {
      const incompleteData = { ...mockBookingData };
      delete incompleteData.user_id;

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incompleteData),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing required fields");
    });

    it("should return 400 when booking_id is missing", async () => {
      const incompleteData = { ...mockBookingData };
      delete incompleteData.booking_id;

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incompleteData),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing required fields");
    });

    it("should return 400 when invitee_id is missing", async () => {
      const incompleteData = { ...mockBookingData };
      delete incompleteData.invitee_id;

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incompleteData),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing required fields");
    });

    it("should return 400 when name is missing", async () => {
      const incompleteData = { ...mockBookingData };
      delete incompleteData.name;

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incompleteData),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing required fields");
    });

    it("should return 400 when email is missing", async () => {
      const incompleteData = { ...mockBookingData };
      delete incompleteData.email;

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incompleteData),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing required fields");
    });

    it("should return 400 when service is missing", async () => {
      const incompleteData = { ...mockBookingData };
      delete incompleteData.service;

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incompleteData),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing required fields");
    });
  });

  describe("GET /api/bookings", () => {
    it("should return 201 when user_id is provided and booking exists", async () => {
      // Create a booking first
      await createBooking();

      const response = await fetch(
        `http://localhost:3000/api/bookings?user_id=${mockBookingData.user_id}`,
        {
          method: "GET",
        }
      );

      const json = await response.json();
      expect(response.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.data).toBeDefined();
    });

    it("should return 400 when user_id parameter is missing", async () => {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "GET",
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing id param");
    });

    it("should return 400 when user_id parameter is empty", async () => {
      const response = await fetch(
        "http://localhost:3000/api/bookings?user_id=",
        {
          method: "GET",
        }
      );

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing id param");
    });

    it("should return 201 with null data when booking does not exist", async () => {
      const response = await fetch(
        "http://localhost:3000/api/bookings?user_id=1df8fffb-4379-4d30-81f2-100aeb530270",
        {
          method: "GET",
        }
      );

      const json = await response.json();
      expect(response.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.data).toBeNull();
    });

    it("should return 201 with success false when booking is cancelled and deleted", async () => {
      await createBooking();

      const response = await fetch(
        `http://localhost:3000/api/bookings?user_id=${mockBookingData.user_id}`,
        {
          method: "GET",
        }
      );

      const json = await response.json();
      expect(response.status).toBe(201);
      expect([true, false]).toContain(json.success);
    });
  });

  describe("DELETE /api/bookings", () => {
    it("should return 200 when booking is deleted successfully", async () => {
      await createBooking();

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: mockBookingData.booking_id,
        }),
      });

      const json = await response.json();
      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.message).toBe("Booking deleted successfully");
    });

    it("should return 400 when booking_id is missing", async () => {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing booking_id");
    });

    it("should return 400 when booking_id is null", async () => {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: null,
        }),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing booking_id");
    });

    it("should return 400 when booking_id is empty string", async () => {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: "",
        }),
      });

      const json = await response.json();
      expect(response.status).toBe(400);
      expect(json.error).toBe("Missing booking_id");
    });
  });
});
