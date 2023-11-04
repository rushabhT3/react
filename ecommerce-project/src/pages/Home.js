const HomePage = () => {
  const UserList = () => {
    const concerts = [
      {
        date: "JUL16",
        location: "DETROIT, MI",
        venue: "DTE ENERGY MUSIC THEATRE",
        ticketLink: "https://www.example.com/tickets/detroit-mi",
      },
      {
        date: "JUL19",
        location: "TORONTO, ON",
        venue: "BUDWEISER STAGE",
        ticketLink: "https://www.example.com/tickets/toronto-on",
      },
      {
        date: "JUL 22",
        location: "BRISTOW, VA",
        venue: "JIGGY LUBE LIVE",
        ticketLink: "https://www.example.com/tickets/bristow-va",
      },
      {
        date: "JUL 29",
        location: "PHOENIX, AZ",
        venue: "AK-CHIN PAVILION",
        ticketLink: "https://www.example.com/tickets/phoenix-az",
      },
      {
        date: "AUG 2",
        location: "LAS VEGAS, NV",
        venue: "T-MOBILE ARENA",
        ticketLink: "https://www.example.com/tickets/las-vegas-nv",
      },
      {
        date: "AUG 7",
        location: "CONCORD, CA",
        venue: "CONCORD PAVILION",
        ticketLink: "https://www.example.com/tickets/concord-ca",
      },
    ];

    return (
      <div className="flex items-center justify-center min-h-screen">
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          {concerts.map((concert, index) => (
            <li
              key={index}
              className={`py-3 sm:py-4${index === 0 ? " pb-0" : ""}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://placekitten.com/80/80"
                    alt="Concert"
                  />
                </div>
                <div className="flex-1 min-w-0 bg-gray-100 p-4 rounded-lg shadow-md">
                  <p className="text-sm font-bold text-blue-700 truncate">
                    {concert.date}
                  </p>
                  <p className="text-sm text-blue-600 truncate">
                    {concert.location}
                  </p>
                  <p className="text-sm text-blue-500 truncate">
                    {concert.venue}
                  </p>
                </div>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Buy Tickets
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section>
      <UserList />
    </section>
  );
};

export default HomePage;
