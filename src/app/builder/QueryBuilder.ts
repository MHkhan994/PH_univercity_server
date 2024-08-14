import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public queryModel: Query<T[], T>
  public query: Record<string, unknown>

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.query = query
    this.queryModel = queryModel
  }

  //   search query
  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          (field: string) =>
            ({
              [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }

    return this
  }

  //   filter query
  filter() {
    const queryObj = { ...this.query }
    const excludeFields: string[] = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
    ]

    excludeFields.forEach((el) => delete queryObj[el])

    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>)

    return this
  }

  // sort query
  sort() {
    const sort =
      (this.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'

    this.queryModel = this.queryModel.sort(sort as string)

    return this
  }

  // pagination
  paginate() {
    const page = Number(this.query?.page) || 1
    const limit = Number(this.query.limit) || 10
    const skip = (page - 1) * limit

    this.queryModel = this.queryModel.skip(skip)

    return this
  }

  // feild filtering
  fields() {
    const fields =
      (this.query?.fields as string)?.split(',')?.join(' ') || '-_v'
    this.queryModel = this.queryModel.select(fields)

    return this
  }
}

export default QueryBuilder
