const XLSX = require("xlsx");
const { getInfo, getSprintPicker, quickCreateIssue } = require("./request");
const { atl_token, formToken } = require("../data/auth");

const workbook = XLSX.readFile("./data/jira.xlsx");
const sheetName = workbook.SheetNames[0]; // 获取第一个表单
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

const getFieldId = (data, { key, findKey = "name", defaultId }) => {
  const field = data.find((item) => item[findKey].includes(key));
  return field?.id || defaultId;
};

const getDataInfo = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([getInfo(), getSprintPicker()])
      .then((res) => {
        if (res[0]?.status === 200 && res[1]?.status === 200) {
          const [infoRes, sprintRes] = res;
          const { components } = infoRes.data;
          const { suggestions: sprints } = sprintRes.data;
          resolve({ components, sprints });
        } else {
          reject("出错了");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createIssues = async (data) => {
  const { components, sprints } = await getDataInfo();
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const issue = {
      pid: 10104,
      issuetype: 10001,
      atl_token,
      formToken,
      summary: item["summary"],
      components: getFieldId(components, {
        key: item["模块"],
        defaultId: "10109",
      }),
      // description: '描述',
      customfield_10400: 10300,
      assignee: item["分配人"] || "stanley.yang",
      reporter: "stanley.yang",
      priority: 4,
      customfield_10105: getFieldId(sprints, {
        key: item["Sprint"],
        defaultId: 410,
      }),
    };

    const response = await quickCreateIssue(issue);
    if (response.status !== 200) {
      console.log(`Failed to create issue: [row: ${i + 1}]${item["summary"]}`);
      return;
    }
    const { issueKey } = response?.data || {};
    if (!issueKey) {
      throw new Error(`失败，接口返回异常：${response.data}`);
    }
    console.log(`Issue created: ${issueKey}`);
  }
};

createIssues(data);
