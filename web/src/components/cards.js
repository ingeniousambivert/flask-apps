import React from "react";

function CardsComponent(props) {
  const { universityData } = props;

  const renderUniversityCard = (data) => (
    <div className="p-5" key={data.name}>
      <div className="w-full lg:max-w-full lg:flex shadow-md border-2 border-bg-gray-300 rounded-md">
        <div
          className="flex-none bg-cover text-center overflow-auto"
          title="Mountain"
        >
          <img
            className="object-cover md:w-60 md:h-60"
            src="https://images.unsplash.com/20/cambridge.JPG?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1030&q=80"
            alt="University Logo"
          />
        </div>
        <div className="bg-white flex flex-col justify-between">
          <div className="mb-8 px-6 pt-4">
            <p className="text-sm text-gray-600 flex items-center">
              {data.alpha_code}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {data.name}
            </div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
            <div className="mt-10">
              <p className="text-gray-600">{data.country}</p>
              <p className="text-gray-600">
                <a
                  className="text-blue-600"
                  href={data.web_page}
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.web_page}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="container mx-auto">
      {universityData ? (
        <div>
          {universityData.results.map((university) => {
            return renderUniversityCard(university);
          })}
        </div>
      ) : (
        <div className="container mx-auto text-center mt-10">
          <p className="text-4xl text-bold"> Loading...</p>
        </div>
      )}
    </div>
  );
}

export default CardsComponent;
