import { supabase } from "@/lib/supabaseClient";
import { Testimonial } from "@/types/testimonials.type";

const route = "http://localhost:3000/api/admin/testimonials";

describe("GET /api/admin/testimonials", () => {
  beforeEach(async () => {
    await supabase
      .from("testimonial")
      .delete()
      .not("testimonial_id", "is", null);
  });

  afterEach(async () => {
    await supabase
      .from("testimonial")
      .delete()
      .not("testimonial_id", "is", null);
  });

  // Happy Path
  it("should return all testimonials ordered by submitted_at desc with status 200", async () => {
    await supabase.from("testimonial").insert([
      {
        name: "Alice",
        email: "alice@example.com",
        title: "CTO",
        rating: 4,
        testimonial: "Great experience!",
        is_approved: "Accepted",
        submitted_at: "2025-06-05T10:00:00Z",
      },
      {
        name: "Bob",
        email: "bob@example.com",
        title: "CEO",
        rating: 5,
        testimonial: "Fantastic!",
        is_approved: "Pending",
        submitted_at: "2025-06-04T09:00:00Z",
      },
      {
        name: "Dana",
        email: "dana@example.com",
        title: "Engineer",
        rating: 5,
        testimonial: "Loved it!",
        is_approved: "Declined",
        submitted_at: "2025-06-03T08:00:00Z",
      },
    ]);

    const response = await fetch(route, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.length).toBe(3); // All testimonials

    const names = json.map((t: Testimonial) => t.name);
    expect(names).toContain("Alice");
    expect(names).toContain("Bob");
    expect(names).toContain("Dana");

    // We verify here that they are ordered by submitted_at descending (so Alice first, then Dana last)
    expect(json[0].name).toBe("Alice");
    expect(json[2].name).toBe("Dana");
  });

  // Sad Path 1 - Invalid HTTP method
  it("should return 405 when using unsupported HTTP method", async () => {
    const response = await fetch(route, {
      method: "POST", // This is an invalid method for this endpoint
      headers: { "Content-Type": "application/json" },
    });

    expect(response.status).toBe(405);
  });

  // Sad Path 2 - Empty database
  it("should return empty array with status 200 when no testimonials exist", async () => {

    const response = await fetch(route, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBe(0);
  });
});

describe("PATCH /api/admin/testimonials", () => {
  let testTestimonialId: number;

  beforeEach(async () => {
    // For clean up
    await supabase
      .from("testimonial")
      .delete()
      .not("testimonial_id", "is", null);

    // We insert a test testimonial
    const { data } = await supabase.from("testimonial").insert([
      {
        name: "Test User",
        email: "test@example.com",
        title: "Tester",
        rating: 5,
        testimonial: "Test testimonial",
        is_approved: "Pending",
      },
    ]).select();

    testTestimonialId = data![0].testimonial_id;
  });

  afterEach(async () => {
    await supabase
      .from("testimonial")
      .delete()
      .not("testimonial_id", "is", null);
  });

  // Happy Path
  it("should successfully update testimonial status to Accepted with status 200", async () => {
    const response = await fetch(route, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: testTestimonialId,
        status: "Accepted",
      }),
    });

    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);

    // We verify the update in the database
    const { data } = await supabase
      .from("testimonial")
      .select("is_approved")
      .eq("testimonial_id", testTestimonialId)
      .single();

    expect(data!.is_approved).toBe("Accepted");
  });

  it("should successfully update testimonial status to Declined with status 200", async () => {
    const response = await fetch(route, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: testTestimonialId,
        status: "Declined",
      }),
    });

    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);

    // We verify the update in database
    const { data } = await supabase
      .from("testimonial")
      .select("is_approved")
      .eq("testimonial_id", testTestimonialId)
      .single();

    expect(data!.is_approved).toBe("Declined");
  });

  // Sad Path 1 - Missing id
  it("should return 400 when id is missing", async () => {
    const response = await fetch(route, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Accepted",
      }),
    });

    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid or missing 'id' or 'status'");
  });

  // Sad Path 2 - Invalid status
  it("should return 400 when status is invalid", async () => {
    const response = await fetch(route, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: testTestimonialId,
        status: "InvalidStatus",
      }),
    });

    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid or missing 'id' or 'status'");
  });

  // Sad Path 3 - Missing status
  it("should return 400 when status is missing", async () => {
    const response = await fetch(route, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: testTestimonialId,
      }),
    });

    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid or missing 'id' or 'status'");
  });

  // Sad Path 4 - Invalid JSON body
  it("should return 500 when request body is invalid JSON", async () => {
    const response = await fetch(route, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: "invalid json",
    });

    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Internal server error");
  });
});