import React, { useEffect, useState } from "react";
import SearchComponent from "../components/search";
import CardsComponent from "../components/cards";
import PaginationComponent from "../components/pagination";
import client from "../utils/client";

function HomePage() {
  const [universityData, setUniversityData] = useState(null);
  const [params, setParams] = useState({
    start: 1,
    limit: 5,
    name: null,
    alpha_code: null,
    domain: null,
  });
  const { start, limit, name, alpha_code, domain } = params;

  useEffect(() => {
    (async (setUniversityData, start, limit, name, alpha_code, domain) => {
      const universities = await client.get("/api/universities", {
        params: { start, limit, name, alpha_code, domain },
      });
      setUniversityData(universities.data);
    })(setUniversityData, start, limit, name, alpha_code, domain);
  }, [start, limit, name, alpha_code, domain]);
  return (
    <div>
      <SearchComponent
        params={params}
        setParams={setParams}
        data={universityData}
      />
      <CardsComponent universityData={universityData} />
      <PaginationComponent
        params={params}
        setParams={setParams}
        data={universityData}
      />
    </div>
  );
}

export default HomePage;
