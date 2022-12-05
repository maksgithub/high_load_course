const axios = require('axios');

describe('test', () => {
    it('test_1', async () => {
        const res = await axios.get("http://ec2-100-25-129-91.compute-1.amazonaws.com/")
        expect(res.data).toEqual("Hello World_10!!")
    })
})