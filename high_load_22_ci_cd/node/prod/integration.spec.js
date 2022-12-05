const axios = require('axios');

describe('test', () => {
    it('test_1', async () => {
        const res = await axios.get("http://ec2-54-160-96-79.compute-1.amazonaws.com/")
        expect(res.data).toEqual("Hello World_10!!")
    })
})