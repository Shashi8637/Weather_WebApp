const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dataField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchfield = document.querySelector(".searchField");
const form = document.querySelector("form");

form.addEventListener("submit", search);

let target = "delhi";

const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=ca3c96d711234f59b6473116230804&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();

        const {
            current: {
                temp_c,
                condition: { text, icon },
            },
            location: { name, localtime },
        } = data;
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location not found")
    }
};

function updateDom(temperate, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperateField.innerText = temperate;
    cityField.innerText = city;
    dataField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;

}

fetchData(target);


function search(e) {
    e.preventDefault();
    target = searchfield.value;

    fetchData(target);
}

function getDayFullName(num) {
    switch (num) {
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thrsday";
        case 5:
            return "friday";
        case 6:
            return "saturday";

        default:
            return "don't know";


    }
}
