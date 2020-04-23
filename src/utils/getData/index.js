const getData = async (url) => {
  let dataResponse = await fetch(url);
  let dataResponseJson = await dataResponse.json();

  return dataResponseJson;
};

export default getData;
