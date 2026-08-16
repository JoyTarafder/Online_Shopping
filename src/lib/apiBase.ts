export function getApiBase(): string {
  const envUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();

  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;

    // 1. If running on local Wi-Fi network (e.g. Samsung A53 accessing http://192.168.x.x:3000)
    //    and NEXT_PUBLIC_API_URL is missing or points to localhost, route to port 5000 of current host IP
    if (
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      (hostname.startsWith("192.168.") ||
        hostname.startsWith("10.") ||
        hostname.startsWith("172."))
    ) {
      if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
        return `${protocol}//${hostname}:5000`;
      }
    }

    // 2. If running on live Vercel or production domain (e.g. *.vercel.app or custom domain)
    if (hostname.endsWith("vercel.app") || hostname.includes("shajsutro")) {
      if (envUrl && !envUrl.includes("localhost")) {
        return envUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
      }
      return "https://online-shopping-backend-liart.vercel.app";
    }
  }

  const raw = envUrl || "https://online-shopping-backend-liart.vercel.app";
  const cleaned = raw.replace(/\/api\/?$/, "").replace(/\/$/, "");
  return cleaned === "" || cleaned === "/" ? "" : cleaned;
}

