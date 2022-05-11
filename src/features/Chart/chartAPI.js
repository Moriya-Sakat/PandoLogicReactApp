import moment from 'moment'

//Should be selected
const startDate = moment().subtract(30,'d')
const endDate = moment()

export async function fetchData() {
  const response = await fetch(`/api/jobs-views/GetMetaData?startDate=${startDate.toJSON()}&endDate=${endDate.toJSON()}`)
  const data = await response.json()
  return data;
}
