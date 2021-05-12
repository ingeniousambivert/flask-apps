import React, { useEffect, useState } from "react";

function SearchComponent(props) {
  const { params, setParams, data } = props;
  const [alphaCode, setAlphaCode] = useState(null);
  const [domain, setDomain] = useState(null);

  const onSearchChange = (e) => {
    setParams({ ...params, name: e.target.value });
  };
  const onAlphaChange = (e) => {
    setParams({ ...params, alpha_code: e.target.value });
  };
  const onDomainChange = (e) => {
    setParams({ ...params, domain: e.target.value });
  };

  const getFilters = (data) => {
    let countryCodes = [];
    let domains = [];
    data.map((item) => {
      countryCodes.push(item.alpha_code);
      domains.push(item.domain);
    });
    setAlphaCode([...new Set(countryCodes)]);
    setDomain([...new Set(domains)]);
  };

  useEffect(() => {
    data && getFilters(data.results);
  }, [data]);

  return (
    <div className="bg-indigo-700 h-50 p-8">
      <div className="container mx-auto py-8">
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-6 gap-4">
          <div className="w-full md:col-span-4">
            <input
              onChange={onSearchChange}
              name="search"
              className="block w-full h-12 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
              type="search"
              placeholder="Search..."
            />
          </div>
          <div className="text-center">
            <select
              onChange={onAlphaChange}
              id="filters"
              name="filters"
              className="block w-full h-12 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-base px-8 shadow-lg"
            >
              <option value={null}>Country Code</option>
              {alphaCode &&
                alphaCode.map((code) => {
                  return (
                    <option value={code} key={code}>
                      {code}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="text-center">
            <select
              onChange={onDomainChange}
              id="filters"
              name="filters"
              className="block w-full h-12 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-base px-8 shadow-lg"
            >
              <option value={null}>Domain</option>
              {domain &&
                domain.map((value) => {
                  return (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
