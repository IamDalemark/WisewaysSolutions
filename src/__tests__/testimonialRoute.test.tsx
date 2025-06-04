import { supabase } from "@/lib/supabaseClient";
const route = "http://localhost:3000/api/testimonials";

describe("POST /api/testimonials", () => {
  beforeEach(async () => {
    await supabase
      .from("testimonial")
      .delete()
      .not("testimonial_id", "is", null);
  });

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

describe("GET /api/testimonials (update through email)", () => {
  let testTestimonialId: string;

  beforeEach(async () => {
    // Clear existing testimonials
    await supabase
      .from("testimonial")
      .delete()
      .not("testimonial_id", "is", null);

    // Insert a test testimonial
    const { data, error } = await supabase
      .from("testimonial")
      .insert([
        {
          name: "Test User",
          email: "test@example.com",
          title: "Tester",
          rating: 5,
          testimonial: "Test testimonial",
          is_approved: "pending",
        },
      ])
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    testTestimonialId = data[0].testimonial_id;
  });

  afterEach(async () => {
    await supabase
      .from("testimonial")
      .delete()
      .not("testimonial_id", "is", null);
  });

  describe("Valid requests", () => {
    it("should accept a testimonial successfully", async () => {
      const url = `${route}?testimonial_id=${testTestimonialId}&is_approved=Accepted`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(200);

      const responseText = await response.text();
      expect(responseText).toBe(
        "Testimonial Accepted. This has been processed successfully."
      );
    });

    it("should decline a testimonial successfully", async () => {
      const url = `${route}?testimonial_id=${testTestimonialId}&is_approved=Declined`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(200);

      const responseText = await response.text();
      expect(responseText).toBe(
        "Testimonial Declined. This has been processed successfully."
      );
    });

    it("should update an already accepted testimonial to declined", async () => {
      // First accept the testimonial
      await supabase
        .from("testimonial")
        .update({ is_approved: "Accepted" })
        .eq("testimonial_id", testTestimonialId);

      // Then decline it
      const url = `${route}?testimonial_id=${testTestimonialId}&is_approved=Declined`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(200);

      const responseText = await response.text();
      expect(responseText).toBe(
        "Testimonial Declined. This has been processed successfully."
      );
    });
  });

  describe("Invalid parameters", () => {
    it("should return 400 when testimonial_id is missing", async () => {
      const url = `${route}?is_approved=Accepted`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.error).toBe("Invalid parameters");
    });

    it("should return 400 when is_approved is missing", async () => {
      const url = `${route}?testimonial_id=${testTestimonialId}`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.error).toBe("Invalid parameters");
    });

    it("should return 400 when both parameters are missing", async () => {
      const url = route;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.error).toBe("Invalid parameters");
    });

    it("should return 400 when is_approved has invalid value", async () => {
      const invalidValues = [
        "accepted",
        "declined",
        "pending",
        "Invalid",
        "ACCEPTED",
        "true",
        "false",
      ];

      for (const invalidValue of invalidValues) {
        const url = `${route}?testimonial_id=${testTestimonialId}&is_approved=${invalidValue}`;
        const response = await fetch(url, { method: "GET" });

        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("Invalid parameters");
      }
    });

    it("should return 400 when testimonial_id is empty string", async () => {
      const url = `${route}?testimonial_id=&is_approved=Accepted`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.error).toBe("Invalid parameters");
    });

    it("should return 400 when is_approved is empty string", async () => {
      const url = `${route}?testimonial_id=${testTestimonialId}&is_approved=`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.error).toBe("Invalid parameters");
    });
  });

  describe("Response format", () => {
    it("should return plain text response for successful operations", async () => {
      const url = `${route}?testimonial_id=${testTestimonialId}&is_approved=Accepted`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(200);

      const responseText = await response.text();
      expect(responseText).toBe(
        "Testimonial Accepted. This has been processed successfully."
      );
    });

    it("should return JSON response for error cases", async () => {
      const url = `${route}?testimonial_id=${testTestimonialId}&is_approved=InvalidValue`;
      const response = await fetch(url, { method: "GET" });

      expect(response.status).toBe(400);

      const json = await response.json();

      expect(typeof json).toBe("object");
      expect(json.error).toBe("Invalid parameters");
    });
  });
});
