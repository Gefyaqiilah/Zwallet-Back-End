const { countUsers } = require('../models/usersModel')
const { pagination } = require('../models/global')
exports.pagination = async (limit, page, endpoint, table, option, queryParams) => {
  let totalData
  if (option) {
    const users = await pagination(option)
    console.log('users :>> ', users);
    totalData = users[0].totalData
  } else {
    const users = await countUsers(table)
    totalData = users[0].totalData
  }
  const totalPage = Math.ceil(totalData / limit)
  const setPagination = {
    totalData: totalData,
    totalPage,
    currentPage: page,
    perPage: limit,
    prevPage: page > 1 ? `${process.env.BASE_URL}/v1/${endpoint}?page=${parseInt(page) - 1}&limit=${limit}${queryParams ? '&'+queryParams: '' }` : null,
    nextPage: page < totalPage ? `${process.env.BASE_URL}/v1/${endpoint}?page=${parseInt(page) + 1}&limit=${limit}${queryParams ? '&'+queryParams: '' }` : null,
  }
  return setPagination
}