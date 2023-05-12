const axios = require('axios');
const { cookie } = require("../data/auth");

const instance = axios.create({
    baseURL: 'http://jira.caidaocloud.com:8080/',
    headers: {'Cookie': cookie}
  });


function getInfo() {
    return instance.get('/rest/api/2/project/DEV?_=1683869370113')
  }

  function getSprintPicker() {
    return instance.get('/rest/greenhopper/1.0/sprint/picker?query=&_=1683874955773')
  }

  function quickCreateIssue(params) {
    return instance.post('/secure/QuickCreateIssue.jspa?decorator=none', params, {
        headers: {
            'Cookie': cookie,
            'Content-Type': 'multipart/form-data'
        }
    })
  }

  module.exports = {getInfo, getSprintPicker, quickCreateIssue}
