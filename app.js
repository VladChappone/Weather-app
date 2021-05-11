const container = document.querySelector('#content')
const userData = document.querySelector('#searchUser')
const submitBtn = document.querySelector('#submit')
const clearBtn = document.querySelector('#clear')

const getData = async input => {
  const keyToAccessData = '4161d4cdf10664e83cf37a759a3487e8'

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${keyToAccessData}`
  )

  const data = await response.json()

  return data
}

const renderData = data => {
  container.innerHTML = `
    <div class="card mx-auto mt-5" style="width: 18rem;">
      <div class="card-body justify-content-center">
        <h5 class="card-title">${data.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Highs of ${(data.main.temp_max - 273.15).toFixed(2)} C. Lows of ${(
    data.main.temp_min - 273.15
  ).toFixed(2)} C.
        </h6>
        <p class="card-text ">
          Weather conditions are described as: ${data.weather[0].description}
        </p>
      </div>
    </div>`
}

submitBtn.addEventListener('click', () => {
  const city =
    userData.value.charAt(0).toUpperCase() +
    userData.value.slice(1).toLowerCase()

  let localData = localStorage.getItem(city)

  if (localData) {
    let cleanData = JSON.parse(localData)
    renderData(cleanData)
    return
  }

  getData(city).then(data => {
    renderData(data)
    localStorage.setItem(`${city}`, JSON.stringify(data))
  })
})

clearBtn.addEventListener('click', () => {
  container.innerHTML = ''
  userData.value = ''
  localStorage.clear()
})
