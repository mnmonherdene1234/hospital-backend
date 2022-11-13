import { Model } from 'mongoose';
import QueryDto from './query.dto';

export default async function modelFind(model: Model<any>, query: QueryDto) {
  const { filter, sort, pagination, populate, select } = query;

  const data = await model
    .find(filter)
    .skip((pagination?.page - 1) * pagination?.pageSize)
    .limit(pagination?.pageSize)
    .sort(sort)
    .select(select)
    .populate(populate);

  return {
    data,
    meta: {
      filter,
      sort,
      pagination,
      populate,
      select,
    },
  };
}
