const timeOptions = document.querySelectorAll('.time-option');
const resultContainers = document.querySelectorAll(".box");

timeOptions.forEach(option => {
    option.addEventListener('change', (event) => {
        if (event.target.id === "daily") {
            showResult("daily", "Yesterday");
        } else if (event.target.id === "weekly") {
            showResult("weekly", "Last Week");
        } else {
            showResult("monthly", "Last Month")
        }
    });
});

let data;
async function fetchData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        data = await response.json();
        showResult("weekly", "Last Week");
    } catch (error) {
        console.error('Error:', error);
    }
}
fetchData();

function showResult(currentPeriod, previousPeriod) {
    for (let i = 0; i < resultContainers.length; i++) {
        const currentTime = resultContainers[i].querySelector(".current-time");
        const previousTime = resultContainers[i].querySelector(".previous-time");
        currentTime.textContent = `${data[i].timeframes[currentPeriod].current}hrs`;
        previousTime.textContent = `${previousPeriod} - ${data[i].timeframes[currentPeriod].previous}hrs`;
    }
}