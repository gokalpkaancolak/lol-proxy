module.exports = function (req, res) {
    res.status(200).json({
        response: [
            {
                fixture: { date: "2026-10-27T19:00:00" },
                teams: { home: { name: "Galatasaray" }, away: { name: "Beşiktaş" } }
            },
            {
                fixture: { date: "2026-10-28T19:00:00" },
                teams: { home: { name: "Fenerbahçe" }, away: { name: "Trabzonspor" } }
            }
        ]
    });
};
