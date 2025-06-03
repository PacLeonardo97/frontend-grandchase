export function waitForCacheRestore(checkFn: () => boolean): Promise<void> {
  return new Promise((resolve) => {
    if (checkFn()) resolve();
    const interval = setInterval(() => {
      if (checkFn()) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}
