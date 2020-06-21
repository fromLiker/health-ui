const queue = [
  {
      "cust_list":[
      ],
      "name":"waike",
      "waiting_seconds":0,
      "cust_index":-1,
      "id":"O_0",
      "confirmed_custumer":0,
      "booked_customer":0
  },
  {
      "cust_list":[
          {
              "name":"zhang san7",
              "exam_duration":31,
              "id":"C_0",
              "age":37
          }],
      "name":"neike",
      "waiting_seconds":0,
      "cust_index":0,
      "id":"O_1",
      "confirmed_custumer":0,
      "booked_customer":0
  },
  {
      "cust_list":[
      ],
      "name":"xueye",
      "waiting_seconds":0,
      "cust_index":-1,
      "id":"O_2",
      "confirmed_custumer":0,
      "booked_customer":1
  }]
  
  export default [
    {
      url: '/cust/offices',
      type: 'get',
      response: () => {
        const queuelist = queue
        // mock error
        if (!queuelist) {
          return {
            status: 500,
            msg: 'Can not get queue list!'
          }
        }
  
        return {
          status: 200,
          msg: 'Get queue list successfully!',
          data: queuelist
        }
      }
    }
  ]
  