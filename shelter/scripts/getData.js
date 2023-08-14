const arrPets = [];

const getData = async () => {
  const res = await fetch('../../scripts/json/pets.json');
  const data = await res.json();
  showData(data);
};

function showData(data) {
  for (let i = 0; i < data.length; i++) {
    arrPets.push(data[i]);
  }
}

export {arrPets, getData};
