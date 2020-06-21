import request from '@/utils/request'

export function getQueue(data) {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    return request({
      url: process.env.VUE_APP_BASE_API + `/cust/offices/${data}`,
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/cust/offices',
      // url: `https://ran-kafka-app-cc-uc-2-wear-mask.container-crush-02-4044f3a4e314f4bcb433696c70d13be9-0000.eu-de.containers.appdomain.cloud/cust/offices/${data}`,
      method: 'get',
      data
    })
  }
}