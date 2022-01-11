export const getDuckQuery = (productId: string) =>
  "SELECT public.ducks.id, title, description, price, image_src, count " +
  "FROM public.ducks " +
  "INNER JOIN public.stocks ON public.ducks.id=public.stocks.id " +
  `WHERE public.ducks.id = '${productId}'`;

export const getDucksListQuery = () =>
  "SELECT public.ducks.id, title, description, price, image_src, count " +
  "FROM public.ducks " +
  "INNER JOIN public.stocks on public.ducks.id=public.stocks.id";

export const createDuckQuery = (
  id: string,
  title: string,
  description: string,
  price: number,
  image_src: string
) =>
  `INSERT INTO 
  public.ducks (id, title, description, price, image_src)
VALUES
  ('${id}', '${title}', '${description}', ${price}, '${image_src}')`;

export const createCountQuery = (id: string, count: number) => `INSERT INTO
  public.stocks (id, count)
VALUES
  ('${id}', ${count})`;
