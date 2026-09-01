// ─────────────────────────────────────
// Chart Type bar
// ─────────────────────────────────────

const ctx1 = document.getElementById("myChart-1");

new Chart(ctx1, {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
            label: "Sales",
            data: [120, 190, 80, 150, 220],
            // BAR COLOR
            backgroundColor: "#3b2ba3",
            // BAR BORDER
            borderColor: "#2c2080",
            borderWidth: 2,
            // BAR SHAPE
            borderRadius: 5,
            // BAR WIDTH
            barPercentage: 1,
            // CATEGORY SPACE
            categoryPercentage: 0.5
        }]
    },

    options: {
        responsive: true,
        // ─────────────────────────────────────
        // X & Y Axis
        // ─────────────────────────────────────
        scales: {
            x: {
                ticks: {
                    font: {
                        family: "Inter",
                        size: 12,
                        weight: "400"
                    }
                }
            },

            y: {
                ticks: {
                    font: {
                        family: "Inter",
                        size: 12,
                        weight: "400"
                    }
                }
            }
        },
        // ─────────────────────────────────────
        // Legend
        // ─────────────────────────────────────
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                align: "center",
                labels: {
                    // Legend marker size
                    boxWidth: 12,
                    boxHeight: 12,

                    // Legend marker shape
                    usePointStyle: true,
                    pointStyle: "rectRounded",

                    // Legend text font
                    font: {
                        family: "Inter",
                        size: 13,
                        weight: "500"
                    },

                    // Legend text color
                    color: "#333"
                }
            }
        }
    }
});


// ─────────────────────────────────────
// Chart Type pie and doughnut
// ─────────────────────────────────────


const ctx2 = document.getElementById("myChart-2");
ctx1.width = 700;
ctx1.height = 600;
new Chart(ctx2, {
    type: "doughnut",
    data: {
        labels: [
            "Headphones",
            "Earbuds",
            "Accessories",
            "Other"
        ],
        datasets: [{
            data: [
                45,
                30,
                15,
                10
            ],
            // ───── Segment colors ─────
            backgroundColor: [
                "#3b2ba3",
                "#6254c7",
                "#897dd8",
                "#b0a7e8"
            ],
            // ───── Segment border ─────
            borderColor: "#ffffff",
            borderWidth: 3,
            // ───── Doughnut shape ─────
            borderRadius: 6,
            // Space between segments
            spacing: 2
        }]
    },

    options: {

        responsive: true,

        // Controls how thick the doughnut is
        cutout: "50%", // 0% makes it a pie chart

        // ─────────────────────────────────
        // Legend
        // ─────────────────────────────────
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                align: "center",
                labels: {
                    // Legend marker size
                    boxWidth: 12,
                    boxHeight: 12,
                    // Marker shape
                    usePointStyle: true,
                    pointStyle: "circle",

                    // Legend text font
                    font: {
                        family: "Inter",
                        size: 14,
                        weight: "500"
                    },
                    // Legend text color
                    color: "#333"
                }
            }
        }
    }
});

// ─────────────────────────────────────
// Chart Type line
// ─────────────────────────────────────

const ctx3 = document.getElementById("myChart-3");

new Chart(ctx3, {
    type: "line",
    data: {
        // X-axis labels
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],
        datasets: [{
            // Legend label
            label: "Sales",
            // Y-axis data
            data: [
                120,
                190,
                150,
                220,
                180,
                250
            ],
            // Line color
            borderColor: "#3b2ba3",
            // Line thickness
            borderWidth: 6,
            // Make line smooth
            tension: 0.4,
            // Point size
            pointRadius: 4,
            // Point color
            pointBackgroundColor: "#2100ff",
            // Point border color
            pointBorderColor: "#ffffff",
            // Point border thickness
            pointBorderWidth: 3,
            // Point size when hovering
            pointHoverRadius: 7,

            // ─────────────────────────────
            // Area below line
            // ─────────────────────────────

            fill: true,
            backgroundColor: "rgba(59, 43, 163, 0.15)"
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: true,
        // ─────────────────────────────────
        // X & Y Axis
        // ─────────────────────────────────
        scales: {
            x: {
                ticks: {
                    font: {
                        family: "Inter",
                        size: 12,
                        weight: "400"
                    },
                    color: "#333"
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        family: "Inter",
                        size: 12,
                        weight: "400"
                    },
                    color: "#333"
                },
                grid: {
                    color: "#e5e5e5"
                }
            }
        },
        // ─────────────────────────────────
        // Legend
        // ─────────────────────────────────
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                align: "center",
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    usePointStyle: true,
                    pointStyle: "line",
                    font: {
                        family: "Inter",
                        size: 14,
                        weight: "500"
                    },
                    color: "#333"
                }
            }
        }
    }
});


// ─────────────────────────────────────
// Chart Type polarArea
// ─────────────────────────────────────

const ctx4 = document.getElementById("myChart-4");
new Chart(ctx4, {
    type: "polarArea",
    data: {
        // Segment labels
        labels: [
            "Headphones",
            "Earbuds",
            "Accessories",
            "Speakers",
            "Other"
        ],
        datasets: [{
            // Values
            data: [
                30,
                25,
                22,
                17,
                12
            ],
            // ───── Segment colors ─────
            backgroundColor: [
                "#3b2ba3",
                "#6254c7",
                "#897dd8",
                "#a99fe3",
                "#c5bfea"
            ],
            // ───── Segment border ─────
            borderColor: "#ffffff",
            borderWidth: 2
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                // Start from zero
                beginAtZero: true,
                // Grid circles
                grid: {
                    display: true,
                    color: "#e5e5e5"
                },
                // Scale labels
                ticks: {
                    display: true,
                    color: "#666",
                    font: {
                        family: "Inter",
                        size: 12,
                        weight: "400"
                    },
                    backdropColor: "transparent"
                }
            }
        },

        // ─────────────────────────────────
        // Legend
        // ─────────────────────────────────
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                align: "center",
                labels: {
                    // Marker size
                    boxWidth: 12,
                    boxHeight: 12,
                    // Marker shape
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                    // Legend font
                    font: {
                        family: "Inter",
                        size: 12,
                        weight: "500"
                    },
                    // Text color
                    color: "#333"
                }
            }
        }
    }
});


// ─────────────────────────────────────
// Chart Type radar
// ─────────────────────────────────────

const ctx5 = document.getElementById("myChart-5");
new Chart(ctx5, {
    type: "radar",
    data: {
        // Radar axis labels
        labels: [
            "Sound Quality",
            "Battery",
            "Comfort",
            "Bass",
            "Design",
            "Price"
        ],
        datasets: [{
            // Legend label
            label: "Resona",
            // Values
            data: [
                90,
                80,
                85,
                95,
                75,
                88
            ],
            // ─────────────────────────────
            // Radar Area
            // ─────────────────────────────
            // Line color
            borderColor: "#3b2ba3",
            // Line thickness
            borderWidth: 2,
            // Filled area
            fill: true,
            // Fill color
            backgroundColor: "rgba(59, 43, 163, 0.15)",
            // Point size
            pointRadius: 5,
            // Point color
            pointBackgroundColor: "#3b2ba3",
            // Point border
            pointBorderColor: "#ffffff",
            // Point border thickness
            pointBorderWidth: 2,
            // Hover point size
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        // ─────────────────────────────────
        // Radar Scale
        // ─────────────────────────────────
        scales: {
            r: {
                // Start from zero
                beginAtZero: true,
                // Maximum value
                max: 100,
                // Minimum value
                min: 0,
                // ─────────────────────────
                // Axis labels
                // ─────────────────────────
                pointLabels: {
                    color: "#333",
                    font: {
                        family: "Inter",
                        size: 14,
                        weight: "400"
                    }
                },
                // ─────────────────────────
                // Scale numbers
                // ─────────────────────────
                ticks: {
                    display: true,
                    stepSize: 20,
                    color: "#666",
                    font: {
                        family: "Inter",
                        size: 11,
                        weight: "400"
                    },
                    backdropColor: "transparent"
                },

                // ─────────────────────────
                // Grid
                // ─────────────────────────
                grid: {
                    display: true,
                    color: "#e5e5e5",
                    lineWidth: 1
                },
                // ─────────────────────────
                // Outer border
                // ─────────────────────────
                angleLines: {
                    display: true,
                    color: "#e5e5e5",
                    lineWidth: 1
                }
            }
        },
        // ─────────────────────────────────
        // Legend
        // ─────────────────────────────────
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                align: "center",
                labels: {
                    // Marker size
                    boxWidth: 12,
                    boxHeight: 12,
                    // Marker shape
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                    // Legend font
                    font: {
                        family: "Inter",
                        size: 14,
                        weight: "500"
                    },
                    // Legend text color
                    color: "#333"
                }
            }
        }
    }
});