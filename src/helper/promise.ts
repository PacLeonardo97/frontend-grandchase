export type IAllSettled = Promise<Response>;

export default async function AllSetled(arrayOfFetch: IAllSettled[]) {
  return (await Promise.allSettled(arrayOfFetch))
    .filter((item) => item.status === 'fulfilled')
    .map((item) => item.value.json());
}
