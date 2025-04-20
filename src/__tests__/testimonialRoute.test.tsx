describe("POST /api/testimonials", () => {
  it("should return 400 if required fields are missing", async () => {
    const response = await fetch("http://localhost:3000/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "example@example.com",
        rating: 4,
        testimonial: "Great!",
      }),
    });
    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.error).toBe("Missing required fields");
  });
});
