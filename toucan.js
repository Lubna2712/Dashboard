const ACTION = {
  LIST: "find",
  ADD: "insertMany",
};

const reqConfig = {
  dataSource: "Cluster0",
  database: "toucan-dev",
  collection: "submissions",
};

const getRequestPayload = (action = "find", payloadData = {}) => {
  const _action = action;
  if (_action) {
    const reqConfig = {
      method: "post",
      url: `https://cors-anywhere.herokuapp.com/https://data.mongodb-api.com/app/data-jdwuk/endpoint/data/beta/action/${_action}`,
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "h7alkz3tWTK9L3IymPeO6bIz6aEJAOXtz0iyl1XZtFke0Bb5NDu8nrU9HUs8UTzL",
      },
      data: payloadData,
    };

    return reqConfig;
  } else {
    return false;
  }
};

const makeAxiosCall = (reqData) => {
  return new Promise((resolve, reject) => {
    fetch(reqData.url, {
      body: reqData.data,
      method: reqData.method,
      headers: reqData.headers,
    })
      .then((response) => response.json())
      .then((data) => resolve(data.documents))
      .catch(function (error) {
        return reject(error);
      });
  });
};

const saveFormData = async (formData = []) => {
  const payloadData = JSON.stringify({
    ...reqConfig,
    documents: formData,
  });
  const saveData = getRequestPayload(ACTION.ADD, payloadData);
  const data = await makeAxiosCall(saveData);
  console.log("> saveFormData ", data);
};

const getFormData = async () => {
  const listPayload = JSON.stringify(reqConfig);
  const listData = getRequestPayload(ACTION.LIST, listPayload);
  const data = await makeAxiosCall(listData);
  return data;
};
