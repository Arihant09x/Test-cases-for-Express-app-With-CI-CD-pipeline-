import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "..";
import { prismaClient } from "../__mock__/db";

vi.mock("../prisma");
describe("Testing Express", () => {
  it("should return User Signed Up", async () => {
    prismaClient.user.create.mockResolvedValue({
      id: 1,
      name: "John",
      password: "123456789",
    });

    // vi.spyOn(prismaClient.user, "create");

    const res = await request(app).post("/signup").send({
      name: John,
      password: "123456789",
    });

    expect(prismaClient.user.create).toHaveBeenCalledWith({
      data: {
        name: "John",
        password: "123456789",
      },
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User John signed up successfully!");
  });

  it("it should check error if zod validation fails", async () => {
    const res = await request(app).post("/signup").send({
      name: 12,
      password: 1212,
    });
    expect(prismaClient.user.create).not.toHaveBeenCalledWith({
      data: {
        name: 12,
        password: 1212,
      },
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid Request");
  });
});
