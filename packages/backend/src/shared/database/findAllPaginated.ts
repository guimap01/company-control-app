const defaultTake = 20;

type FindAllPaginatedResponse<T = any> = {
  data: T[];
  count: number;
};

export async function findAllPaginated<T = any>({
  service,
  page = 1,
  withDeleted = false,
}: {
  service: any;
  page?: number;
  withDeleted?: boolean;
}): Promise<FindAllPaginatedResponse<T>> {
  const count = await service.count();

  const data = await service.findMany({
    skip: (page - 1) * defaultTake,
    take: defaultTake,
    where: {
      ...(withDeleted ? {} : { deletedAt: null }),
    },
  });

  return {
    data,
    count,
  };
}
