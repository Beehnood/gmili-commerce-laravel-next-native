import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/api/api";
import { authService } from "@/services/auth.service";

vi.mock("@/api/api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("envoie les données de connexion à /login", async () => {
    const credentials = {
      email: "client@gmilli.fr",
      password: "password123",
    };

    const responseData = {
      token: "test-token",
      user: {
        id: 1,
        first_name: "Test",
        last_name: "User",
        email: "client@gmilli.fr",
      },
    };

    vi.mocked(api.post).mockResolvedValue({
      data: responseData,
    });

    const result = await authService.login(credentials);

    expect(api.post).toHaveBeenCalledWith("/login", credentials);
    expect(result).toEqual(responseData);
  });

  it("échange le code Google avec Laravel", async () => {
    const responseData = {
      token: "google-token",
      user: {
        id: 2,
        first_name: "Google",
        last_name: "User",
        email: "google@gmilli.fr",
      },
    };

    vi.mocked(api.post).mockResolvedValue({
      data: responseData,
    });

    const result =
      await authService.exchangeGoogleCode("google-code-test");

    expect(api.post).toHaveBeenCalledWith(
      "/auth/google/exchange",
      {
        code: "google-code-test",
      }
    );

    expect(result).toEqual(responseData);
  });

  it("récupère l'utilisateur connecté avec /me", async () => {
    const responseData = {
      user: {
        id: 1,
        first_name: "Behnood",
        last_name: "Test",
        email: "test@gmilli.fr",
      },
    };

    vi.mocked(api.get).mockResolvedValue({
      data: responseData,
    });

    const result = await authService.me();

    expect(api.get).toHaveBeenCalledWith("/me");
    expect(result.data).toEqual(responseData);
  });

  it("appelle /logout", async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: {
        message: "Déconnexion réussie",
      },
    });

    await authService.logout();

    expect(api.post).toHaveBeenCalledWith("/logout");
  });
});