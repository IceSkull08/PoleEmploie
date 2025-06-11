document.addEventListener('DOMContentLoaded', () => {

    const salaireMin = document.getElementById('salaireMin');
    const salaireMax = document.getElementById('salaireMax');
    const salaireMinValue = document.getElementById('valueSalaireMin');
    const salaireMaxValue = document.getElementById('valueSalaireMax');

    salaireMinValue.textContent = salaireMin.value;
    salaireMaxValue.textContent = salaireMax.value;

    salaireMin.addEventListener('input', () => {
    salaireMinValue.textContent = salaireMin.value;
    });

    salaireMax.addEventListener('input', () => {
        salaireMaxValue.textContent = salaireMax.value;
    });

    const jobItem = document.getElementById('jobItem');
    const jobBody = document.getElementById('jobBody');
    jobItem.addEventListener('click', () => {
        jobBody.hidden = !jobBody.hidden;
    });
});
