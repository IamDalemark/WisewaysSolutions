describe("POST /api/testimonials", () => {
  it("should return 201 when all required fields are present", async () => {
    const response = await fetch("http://localhost:3000/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        rating: 5,
        testimonial: "Awesome service!",
      }),
    });

    const json = await response.json();
    expect(response.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await fetch("http://localhost:3000/api/testimonials", {
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

  it("should return 400 when email is invalid", async () => {
    const response = await fetch("http://localhost:3000/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Invalid Email User",
        email: "not-an-email",
        rating: 4,
        testimonial: "Good stuff!",
      }),
    });

    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid email format");
  });
});
