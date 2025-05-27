import { supabase } from "@/lib/supabaseClient";
const route = "http://localhost:3000/api/testimonials";

beforeEach(async () => {
  await supabase.from("testimonial").delete().not("testimonial_id", "is", null);
});

describe("POST /api/testimonials", () => {
  it("should return 201 when all required fields are present", async () => {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        title: "CEO",
        rating: 5,
        testimonial: "Awesome service!",
      }),
    });

    const json = await response.json();
    expect(response.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data[0]).toEqual(
      expect.objectContaining({
        testimonial_id: expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        ),
        submitted_at: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+(\+\d{2}:\d{2}|Z)$/
        ),
        name: "John Doe",
        testimonial: "Awesome service!",
        rating: "5",
        is_approved: "pending",
        email: "john@example.com",
        title: "CEO",
      })
    );
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await fetch(route, {
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
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Invalid Email User",
        email: "not-an-email",
        title: "CEO",
        rating: 4,
        testimonial: "Good stuff!",
      }),
    });

    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid email format");
  });
});
