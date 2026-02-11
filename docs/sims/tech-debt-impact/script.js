const quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'];
const baseVelocity = 50;

function calculateIgnoringDebt() {
    const values = [];
    let velocity = baseVelocity;
    for (let i = 0; i < 12; i++) {
        values.push(Math.round(velocity));
        velocity *= (1 - 0.04 - (i * 0.005));
    }
    return values;
}

function calculateWithReduction(pct) {
    const values = [];
    const allocationFraction = pct / 100;
    let effectiveVelocity = baseVelocity;
    let debtLevel = 1.0;

    for (let i = 0; i < 12; i++) {
        const featureWork = effectiveVelocity * (1 - allocationFraction);
        values.push(Math.round(featureWork));

        debtLevel = Math.max(0.2, debtLevel - (allocationFraction * 0.15));
        effectiveVelocity = baseVelocity * (1 + (1 - debtLevel) * 0.6);
    }
    return values;
}

const ctx = document.getElementById('velocityChart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: quarters,
        datasets: [
            {
                label: 'With Debt Reduction',
                data: calculateWithReduction(20),
                borderColor: '#2e86c1',
                backgroundColor: 'rgba(46, 134, 193, 0.1)',
                borderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false,
                tension: 0.3
            },
            {
                label: 'Ignoring Debt',
                data: calculateIgnoringDebt(),
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderDash: [6, 4],
                fill: false,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { family: "'Segoe UI', system-ui, sans-serif", size: 13 },
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y} story points`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Quarter',
                    font: { family: "'Segoe UI', system-ui, sans-serif", size: 13, weight: '600' },
                    color: '#1e4b69'
                },
                grid: { display: false }
            },
            y: {
                title: {
                    display: true,
                    text: 'Feature Velocity (Story Points)',
                    font: { family: "'Segoe UI', system-ui, sans-serif", size: 13, weight: '600' },
                    color: '#1e4b69'
                },
                min: 0,
                max: 70,
                grid: { color: 'rgba(0,0,0,0.06)' }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        }
    }
});

const slider = document.getElementById('debtSlider');
const sliderValue = document.getElementById('sliderValue');
const crossoverQuarter = document.getElementById('crossoverQuarter');
const velocityGain = document.getElementById('velocityGain');
const totalFeatures = document.getElementById('totalFeatures');

function updateChart() {
    const pct = parseInt(slider.value);
    sliderValue.textContent = pct + '%';

    const withReduction = calculateWithReduction(pct);
    const ignoringDebt = calculateIgnoringDebt();

    chart.data.datasets[0].data = withReduction;
    chart.data.datasets[1].data = ignoringDebt;
    chart.update();

    let crossover = 'Never';
    for (let i = 0; i < 12; i++) {
        if (withReduction[i] > ignoringDebt[i]) {
            crossover = quarters[i];
            break;
        }
    }
    crossoverQuarter.textContent = crossover;

    const gain = withReduction[11] - ignoringDebt[11];
    velocityGain.textContent = (gain > 0 ? '+' : '') + gain + ' pts';

    const totalWith = withReduction.reduce((a, b) => a + b, 0);
    const totalIgnore = ignoringDebt.reduce((a, b) => a + b, 0);
    const cumulative = totalWith - totalIgnore;
    totalFeatures.textContent = (cumulative > 0 ? '+' : '') + cumulative + ' pts';
}

slider.addEventListener('input', updateChart);
updateChart();
