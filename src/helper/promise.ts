export type IAllSettled = Promise<Response>;

export async function allSettled(arrayOfFetch: IAllSettled[]) {
  const data = (await Promise.allSettled(arrayOfFetch))
    .filter((item) => item.status === 'fulfilled')
    .map(async (item) => await item.value.json());

  return Promise.all(data);
}
