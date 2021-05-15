
window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Top U.S Smartphone Operating Systems By Market Share, Q3 2012"
            },
            data: [
                {
                    type: "doughnut",
                    dataPoints: [
                        { y: 53.37, indexLabel: "Android" },
                        { y: 35.0, indexLabel: "Apple iOS" },
                        { y: 7, indexLabel: "Blackberry" },
                        { y: 2, indexLabel: "Windows Phone" },
                        { y: 5, indexLabel: "Others" }
                    ]
                }
            ]
        });

    chart.render();
}
