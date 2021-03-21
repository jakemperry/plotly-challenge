var samples = fetch('samples.json')
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse))

console.log(samples)