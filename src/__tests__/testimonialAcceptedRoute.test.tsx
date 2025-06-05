import { supabase } from "@/lib/supabaseClient";
import { Testimonial } from "@/types/testimonials.type";
const route = "http://localhost:3000/api/testimonials/accepted";

describe("GET /api/testimonials/accepted", () => {
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

  it("should return only accepted testimonials with status 200", async () => {
    await supabase.from("testimonial").insert([
      {
        name: "Alice",
        email: "alice@example.com",
        title: "CTO",
        rating: 4,
        testimonial: "Great experience!",
        is_approved: "Accepted",
      },
      {
        name: "Bob",
        email: "bob@example.com",
        title: "CEO",
        rating: 5,
        testimonial: "Fantastic!",
        is_approved: "pending",
      },
      {
        name: "Dana",
        email: "dana@example.com",
        title: "Engineer",
        rating: 5,
        testimonial: "Loved it!",
        is_approved: "Accepted",
      },
    ]);

    const response = await fetch(route, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data.length).toBe(2); // Alice and Dana

    const names = json.data.map((t: Testimonial) => t.name);
    expect(names).toContain("Alice");
    expect(names).toContain("Dana");
    expect(names).not.toContain("Bob");

    // Verify all returned testimonials are accepted
    json.data.forEach((testimonial: Testimonial) => {
      expect(testimonial.is_approved).toBe("Accepted");
    });
  });

  it("should return empty array if no accepted testimonials exist", async () => {
    // Insert only rejected testimonial
    await supabase.from("testimonial").insert([
      {
        name: "Eve",
        email: "eve@example.com",
        title: "Intern",
        rating: 2,
        testimonial: "Not good",
        is_approved: "Rejected",
      },
    ]);
    // small delay to ensure database operations are complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(route, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.data.length).toBe(0);
  });
});
