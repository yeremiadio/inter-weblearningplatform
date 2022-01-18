export const searchFilter = (data = {}, search = "") => {
  if (search == null) return data;
  else if (data.title.toLowerCase().includes(search.toLowerCase())) {
    return data;
  }
};

export const paginate = (
  items = [],
  current_page = 0,
  per_page_items = 0,
  search = ""
) => {
    
  //Define Variables with slicing, and filtering the data
  let page = current_page || 1,
    per_page = search !== "" ? items?.length : per_page_items || 10,
    offset = (page - 1) * per_page,
    paginatedItems = items
      ?.slice(offset)
      .slice(0, per_page_items)
      .filter((data) => searchFilter(data, search)),
    total_pages = Math.ceil(items?.length / per_page);

  //Return object data
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items?.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
};
