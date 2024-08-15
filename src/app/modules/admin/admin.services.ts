import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from '../students/students.constants'
import Admin from './admin.model'

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)

  return result
}

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.queryModel

  return result
}

export const AdminServices = {
  getSingleAdminFromDB,
  getAllAdminFromDB,
}
