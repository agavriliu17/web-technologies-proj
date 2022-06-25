const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const chartColors = ["red", "green", "blue", "yellow", "black", "magenta", "purple"];

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

function randomColor(){
  return chartColors[Math.floor((Math.random()*chartColors.length))];
}

//modal actions
const modal = document.querySelector("custom-modal");
const closeModalBtn = document.querySelector("#close-modal");
const addServiceSidebar = document.querySelector("#open-modal");
const doneButton = document.querySelector("#add-service");

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

addServiceSidebar.addEventListener("click", () => {
  modal.open();
});

doneButton.addEventListener("click", () => {
  modal.addService();
});

// SIDEBAR ROUTING

const SIDEBAR_ROUTES = [
  "/frontend/pages/admin/dashboard",
  "/frontend/pages/admin/customers",
  "/frontend/pages/admin/orders",
  "/frontend/pages/admin/services",
  "/frontend/pages/admin/analytics",
  "/frontend/pages/admin/settings",
];

const sidebar = document.querySelectorAll("aside a");

sidebar.forEach((option, index) => {
  if (index < 5)
    option.addEventListener("click", () => {
      window.location.href = SIDEBAR_ROUTES[index];
    });
});

// Fetch data from db
function fetchRegion(region){
  const getRegionsURL = "http://localhost:3010/api/v1/stats/all-services-region";
  console.log("Fetching " + region);
  fetch(getRegionsURL, {
    body: JSON.stringify({region : region}),
    method : 'POST',
  })
  .then((res) => res.json())
  .then((data) => {
    var services = data;
    for(service of services){
      putServiceInChart(service.id);
    }
  });
}

function putServiceInChart(id){
  const serviceURL = "http://localhost:3010/api/v1/services/id=" + id;
  fetch(serviceURL, {
    headers: {
      "Authorization" : localStorage.getItem("token"),
    }
  })
  .then((res) => res.json())
  .then((data) => {
    var service = data;
    const serviceData = {
      label : service.name,
      data: [
        4324, 9452, 4301, 2433, 4321, 1432, 10211, 31233, 2132, 64321, 12313,
      ],
      borderColor: randomColor(),
      borderWidth: 2,
    }
    revenueChart.data.datasets.push(serviceData);
    revenueChart.update();
    console.log(revenueChart.data.datasets);
  });
}

//logout button
const logoutButton = document.querySelector("#logout-btn");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/pages/login";
});

const chart = document.querySelector("#chart-1").getContext("2d");

const bgColor = {
  id: "bgColor",
  beforeDraw: (chart, options) => {
    const { ctx, width, height } = chart;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },
};

//create chart instance
var revenueChart = new Chart(chart, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
    ],
    datasets: [
      // {
      //   label: "Service-1",
      //   data: [
      //     4324, 9452, 4301, 2433, 4321, 1432, 10211, 31233, 2132, 64321, 12313,
      //   ],
      //   borderColor: "red",
      //   borderWidth: 2,
      // },
      // {
      //   label: "Service-2",
      //   data: [524, 952, 301, 2433, 4321, 132, 1211, 3213, 3232, 24321, 1413],
      //   borderColor: "blue",
      //   borderWidth: 2,
      // },
    ],
    options: {
      responsive: true,
    },
    plugins: [bgColor],
  },
});

Chart.register(bgColor);

// Generate pie chart

const getOrdersByLocation = async () => {
  const data = await fetch(
    "http://localhost:3010/api/v1/stats/top-services-per-region"
  ).then((res) => res.json());
};

const pieChart = document.querySelector("#chart-2").getContext("2d");

const locationsChart = new Chart(pieChart, {
  type: "pie",
  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
});

// Selecting location
const selectedAll = document.querySelectorAll(".selected");

selectedAll.forEach((selected) => {
  const optionsContainer = selected.previousElementSibling;
  const searchBox = selected.nextElementSibling;

  const optionsList = optionsContainer.querySelectorAll(".option");

  selected.addEventListener("click", () => {
    if (optionsContainer.classList.contains("active")) {
      optionsContainer.classList.remove("active");
    } else {
      let currentActive = document.querySelector(".options-container.active");

      if (currentActive) {
        currentActive.classList.remove("active");
      }

      optionsContainer.classList.add("active");
      
    }

    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active")) {
      searchBox.focus();
      
    }
  });

  optionsList.forEach((o) => {
    o.addEventListener("click", () => {
      selected.innerHTML = o.querySelector("label").innerHTML;
      fetchRegion(selected.innerHTML);
      optionsContainer.classList.remove("active");
    });
  });

  searchBox.addEventListener("keyup", function (e) {
    filterList(e.target.value);
  });

  const filterList = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    optionsList.forEach((option) => {
      let label =
        option.firstElementChild.nextElementSibling.innerText.toLowerCase();
      if (label.indexOf(searchTerm) != -1) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  };
});

//exporting data as pdf

const downloadPDF = () => {
  const myChart = document.querySelector("#chart-1");
  // create image
  const canvasImage = myChart.toDataURL("image/jpeg", 1.0);

  let pdf = new jsPDF("landscape");
  pdf.setFontSize(20);
  // pdf.text(15, 15,"random text"); use this to add text
  pdf.addImage(canvasImage, "JPEG", 15, 15, 280, 150);
  pdf.save("myChart.pdf");
};

const exportBtn = document.querySelector(".export");
exportBtn.addEventListener("click", downloadPDF);
