export default (items = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return items;
    default:
      return items;
  }
};
