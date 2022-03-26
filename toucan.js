const getRequestPayload = () => {
  const reqConfig = {
    method: "get",
    url: `https://hippostores.herokuapp.com/api/v2/data`,
    headers: {
      "Content-Type": "application/json",
      hkey: "RHNmMjRSRUZmdmZIcTEyMG95QHNtcTh3cjJ0amVmbVtwc2M/bERHZEdSUSQjQCQjJEZFI3Q=",
    },
  };

  return reqConfig;
};

const makeAxiosCall = (reqData) => {
  return new Promise((resolve, reject) => {
    fetch(reqData.url, {
      body: reqData.data,
      method: reqData.method,
      headers: reqData.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        return resolve(data.data);
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};
const getFormData = async () => {
  const listData = getRequestPayload();
  const data = await makeAxiosCall(listData);
  return data;
};
