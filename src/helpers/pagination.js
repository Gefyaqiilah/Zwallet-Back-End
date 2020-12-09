const { countUsers } = require('../models/usersModel')
exports.pagination = async (limit, page, endpoint, table) => {
  const users = await countUsers(table)
  const totalData = users[0].totalData
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData: totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/v1/${endpoint}?page=${page - 1}&limit=${limit}` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/v1/${endpoint}?page=${page + 1}&limit=${limit}` : null,
  }
  return setPagination
}