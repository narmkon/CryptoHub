let isServerStarted = false;

export const initMocks = async () => {
  if (!isServerStarted) {
    const { server } = await import("./server");
    server.listen({ onUnhandledRequest: "error" });
    isServerStarted = true;
    console.log("🔶 MSW Server initialized");
  }
};
